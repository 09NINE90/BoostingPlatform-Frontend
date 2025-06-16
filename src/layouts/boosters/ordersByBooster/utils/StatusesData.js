const IN_PROGRESS = 'IN_PROGRESS';
const COMPLETED = 'COMPLETED';

const ordersStatusesMap = new Map([
    ['IN_PROGRESS', 'In Progress'],
    ['COMPLETED', 'Completed'],
]);

const ordersStatuses = ['IN_PROGRESS', 'COMPLETED'];

export {IN_PROGRESS, COMPLETED, ordersStatusesMap, ordersStatuses};