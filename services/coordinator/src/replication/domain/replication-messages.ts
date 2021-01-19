export enum ReplicationRequestMessages{
    VOTE_REQUEST = "VOTE_REQUEST",
    GLOBAL_COMMIT = "GLOBAL_COMMIT"
}

export enum ReplicationResponseMessages{
    VOTE_COMMIT = "VOTE_COMMIT",
    VOTE_ABORT = "VOTE_ABORT"
}

export enum MOBCoordinatorMessages{
    REPLICATE_OBJECTS = "REPLICATE_OBJECTS",
    RESTORE_OBJECTS= "RESTORE_OBJECTS",
}

export enum ReplicatorCoordinatorMessages{
    START_REPLICATION = "MAKE_REPLICATION",
    RETRIEVE_OBJECTS = "RETRIEVE_OBJECTS"
}
