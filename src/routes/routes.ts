import express from 'express';
import moverRoutes from './moverRoutes';
import itemRoutes from './itemRoutes';

export default function (app: express.Application): void {
    app.use('/movers', moverRoutes);
    app.use('/items', itemRoutes);

    // 404 handler
    app.all('*', (req: express.Request, res: express.Response) => {
        res.status(404).json({
            status: 'fail',
            message: `Can't find ${req.originalUrl} on this server!`
        });
    });
}
