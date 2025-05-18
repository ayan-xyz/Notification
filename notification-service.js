const { Resend } = require('resend');
const Notification = require('../database/models/Notification');
require('dotenv').config();

class NotificationService {
    constructor() {
        this.resend = new Resend(process.env.RESEND_API_KEY);
        console.log('Resend email service initialized');
    }

    async SendOrderConfirmation(userId, orderData) {
        try {
            console.log('Preparing to send order confirmation email for order:', orderData);

            const emailContent = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #333; text-align: center;">Order Placed Successfully!</h1>
                    <p>Thank you for your order. Your order has been received and is being processed.</p>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0;">
                        <h2 style="color: #333;">Order Summary</h2>
                        <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                        <p><strong>Total Amount:</strong> $${orderData.total}</p>
                        <p><strong>Number of Items:</strong> ${orderData.items.length}</p>
                    </div>

                    <p style="text-align: center; color: #666;">
                        Thank you for shopping with us!
                    </p>
                </div>
            `;

            const emailData = {
                from: 'MultiVendor <orders@multivendor.com>',
                to: userId.email, 
                subject: 'Order Confirmation - Your Order Has Been Placed!',
                html: emailContent
            };

            console.log('Sending email with configuration:', emailData);
            const { data, error } = await this.resend.emails.send(emailData);
            
            if (error) {
                console.error('Error sending email:', error);
                return { success: false, error: error.message };
            }

            console.log('Email sent successfully:', data);
            return { success: true, messageId: data.id };
        } catch (error) {
            console.error('Error sending order confirmation:', error);
            return { success: false, error: error.message };
        }
    }

    async SubscribeEvents(payload) {
        try {
            console.log('Received event payload:', payload);
            const { event, data } = JSON.parse(payload);

            switch(event) {
                case 'ORDER_CREATED':
                    console.log('Processing ORDER_CREATED event with data:', data);
                    await this.SendOrderConfirmation(data.userId, data.order);
                    break;
                default:
                    console.log('Unhandled event type:', event);
            }
        } catch (error) {
            console.error('Error in SubscribeEvents:', error);
        }
    }
}

module.exports = NotificationService;
