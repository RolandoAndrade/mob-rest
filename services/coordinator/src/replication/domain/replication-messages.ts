export enum ReplicationRequestMessages{
    VOTE_REQUEST = "VOTE_REQUEST",
    GLOBAL_COMMIT = "GLOBAL_COMMIT",
    GLOBAL_ABORT = "GLOBAL_ABORT",
    LETS_MAKE_A_REPLICATION = "LETS_MAKE_A_REPLICATION"
}

export enum ReplicationResponseMessages{
    VOTE_COMMIT = "VOTE_COMMIT",
    VOTE_ABORT = "VOTE_ABORT"
}

export enum ReplicatorCoordinatorMessages{
    MAKE_REPLICATION = "MAKE_REPLICATION",
    RETRIEVE_OBJECTS = "RETRIEVE_OBJECTS"
}
