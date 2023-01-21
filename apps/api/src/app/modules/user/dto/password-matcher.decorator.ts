import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'PasswordMatcher' })
export class MatchConstraint implements ValidatorConstraintInterface {
    validate(value: unknown, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as unknown)[relatedPropertyName];
        return value === relatedValue;
    }
}

export function PasswordMatcher(property: string, validationOptions?: ValidationOptions) {
    return (object: unknown, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}
