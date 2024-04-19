interface MagicMover {
    weightLimit: number;
    energy: number;
    state: 'resting' | 'loading' | 'on a mission' | 'done';
    currentLoad: number;
    missionsCompleted: number;
}