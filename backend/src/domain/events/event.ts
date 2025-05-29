export interface IDomainEvent {
    readonly eventId: string;
    readonly eventName: string;
    readonly occurredOn: Date;
    getAggregateId(): string;
}
