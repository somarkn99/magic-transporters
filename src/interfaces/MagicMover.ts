/**
 * Interface representing the attributes of a Mover entity.
 * This defines the properties that are essential to manage the state and capacity
 * of a mover in the application, allowing for tracking and operations on movers.
 */
interface MagicMover {
    weightLimit: number;       // Maximum weight the mover can carry at any given time.
    energy: number;            // Current energy level of the mover, affecting its ability to operate.
    state: 'resting' | 'loading' | 'on a mission' | 'done';  // Current operational state of the mover.
    currentLoad: number;       // Current weight being carried by the mover.
    missionsCompleted: number; // Total number of missions completed by the mover.
}
