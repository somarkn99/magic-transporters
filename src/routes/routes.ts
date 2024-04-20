import express from 'express';
import moverRoutes from './moverRoutes';
import itemRoutes from './itemRoutes';

const setupRoutes = (app: express.Application): void => {
    app.use('/api/v1/movers', moverRoutes);
    app.use('/api/v1/items', itemRoutes);

    // 404 handler
    app.all('*', (req: express.Request, res: express.Response) => {
        res.status(404).json({
            status: 'fail',
            message: `Can't find ${req.originalUrl} on this server!`
        });
    });
}

export default setupRoutes;