import { injectable } from 'tsyringe';

export interface UseCase<I, O> {
    execute(input: I): Promise<O>;
}
