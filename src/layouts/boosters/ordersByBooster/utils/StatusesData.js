const IN_PROGRESS = 'IN_PROGRESS';
const ON_PENDING = 'ON_PENDING';
const COMPLETED = 'COMPLETED';

const ordersStatusesMap = new Map([
    ['IN_PROGRESS', 'In Progress'],
    ['ON_PENDING', 'On pending'],
    ['COMPLETED', 'Completed'],
]);

export {IN_PROGRESS, ON_PENDING, COMPLETED, ordersStatusesMap};