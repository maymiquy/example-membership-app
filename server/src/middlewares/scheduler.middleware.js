const cron = require('node-cron');
const membershipService = require('../services/membership.service');

exports.dailyResetScheduler = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('Daily reset cron job started at:', new Date().toLocaleString());
        try {
            const result = await membershipService.resetDailyLimit();
            console.log('Daily limit reset completed at:', new Date().toLocaleString());
            console.log('Reset result:', result);
        } catch (error) {
            console.error('Error resetting daily limit:', error);
        }
    });
};