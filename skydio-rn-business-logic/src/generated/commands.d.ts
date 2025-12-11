import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace commands. */
export namespace commands {

    /** Properties of a Command. */
    interface ICommand {

        /** Command callbackId */
        callbackId?: (string|null);

        /** Command increment */
        increment?: (commands.IIncrementCommand|null);

        /** Command decrement */
        decrement?: (commands.IDecrementCommand|null);

        /** Command setCounter */
        setCounter?: (commands.ISetCounterCommand|null);

        /** Command getCounter */
        getCounter?: (commands.IGetCounterCommand|null);

        /** Command addUser */
        addUser?: (commands.IAddUserCommand|null);

        /** Command removeUser */
        removeUser?: (commands.IRemoveUserCommand|null);

        /** Command getUsers */
        getUsers?: (commands.IGetUsersCommand|null);

        /** Command calculateSum */
        calculateSum?: (commands.ICalculateSumCommand|null);

        /** Command validateInput */
        validateInput?: (commands.IValidateInputCommand|null);

        /** Command fetchUserData */
        fetchUserData?: (commands.IFetchUserDataCommand|null);

        /** Command getConfiguration */
        getConfiguration?: (commands.IGetConfigurationCommand|null);

        /** Command updateConfiguration */
        updateConfiguration?: (commands.IUpdateConfigurationCommand|null);

        /** Command getState */
        getState?: (commands.IGetStateCommand|null);
    }

    /** Represents a Command. */
    class Command implements ICommand {

        /**
         * Constructs a new Command.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.ICommand);

        /** Command callbackId. */
        public callbackId: string;

        /** Command increment. */
        public increment?: (commands.IIncrementCommand|null);

        /** Command decrement. */
        public decrement?: (commands.IDecrementCommand|null);

        /** Command setCounter. */
        public setCounter?: (commands.ISetCounterCommand|null);

        /** Command getCounter. */
        public getCounter?: (commands.IGetCounterCommand|null);

        /** Command addUser. */
        public addUser?: (commands.IAddUserCommand|null);

        /** Command removeUser. */
        public removeUser?: (commands.IRemoveUserCommand|null);

        /** Command getUsers. */
        public getUsers?: (commands.IGetUsersCommand|null);

        /** Command calculateSum. */
        public calculateSum?: (commands.ICalculateSumCommand|null);

        /** Command validateInput. */
        public validateInput?: (commands.IValidateInputCommand|null);

        /** Command fetchUserData. */
        public fetchUserData?: (commands.IFetchUserDataCommand|null);

        /** Command getConfiguration. */
        public getConfiguration?: (commands.IGetConfigurationCommand|null);

        /** Command updateConfiguration. */
        public updateConfiguration?: (commands.IUpdateConfigurationCommand|null);

        /** Command getState. */
        public getState?: (commands.IGetStateCommand|null);

        /** Command command. */
        public command?: ("increment"|"decrement"|"setCounter"|"getCounter"|"addUser"|"removeUser"|"getUsers"|"calculateSum"|"validateInput"|"fetchUserData"|"getConfiguration"|"updateConfiguration"|"getState");

        /**
         * Creates a new Command instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Command instance
         */
        public static create(properties?: commands.ICommand): commands.Command;

        /**
         * Encodes the specified Command message. Does not implicitly {@link commands.Command.verify|verify} messages.
         * @param message Command message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.ICommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Command message, length delimited. Does not implicitly {@link commands.Command.verify|verify} messages.
         * @param message Command message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.ICommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Command message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Command
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.Command;

        /**
         * Decodes a Command message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Command
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.Command;

        /**
         * Verifies a Command message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Command message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Command
         */
        public static fromObject(object: { [k: string]: any }): commands.Command;

        /**
         * Creates a plain object from a Command message. Also converts values to other types if specified.
         * @param message Command
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.Command, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Command to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Command
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Response. */
    interface IResponse {

        /** Response callbackId */
        callbackId?: (string|null);

        /** Response error */
        error?: (commands.IErrorResponse|null);

        /** Response counter */
        counter?: (commands.ICounterResponse|null);

        /** Response user */
        user?: (commands.IUserResponse|null);

        /** Response users */
        users?: (commands.IUsersResponse|null);

        /** Response success */
        success?: (commands.ISuccessResponse|null);

        /** Response sum */
        sum?: (commands.ISumResponse|null);

        /** Response validation */
        validation?: (commands.IValidationResponse|null);

        /** Response configuration */
        configuration?: (commands.IConfigurationResponse|null);

        /** Response state */
        state?: (commands.IStateResponse|null);
    }

    /** Represents a Response. */
    class Response implements IResponse {

        /**
         * Constructs a new Response.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IResponse);

        /** Response callbackId. */
        public callbackId: string;

        /** Response error. */
        public error?: (commands.IErrorResponse|null);

        /** Response counter. */
        public counter?: (commands.ICounterResponse|null);

        /** Response user. */
        public user?: (commands.IUserResponse|null);

        /** Response users. */
        public users?: (commands.IUsersResponse|null);

        /** Response success. */
        public success?: (commands.ISuccessResponse|null);

        /** Response sum. */
        public sum?: (commands.ISumResponse|null);

        /** Response validation. */
        public validation?: (commands.IValidationResponse|null);

        /** Response configuration. */
        public configuration?: (commands.IConfigurationResponse|null);

        /** Response state. */
        public state?: (commands.IStateResponse|null);

        /** Response result. */
        public result?: ("error"|"counter"|"user"|"users"|"success"|"sum"|"validation"|"configuration"|"state");

        /**
         * Creates a new Response instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Response instance
         */
        public static create(properties?: commands.IResponse): commands.Response;

        /**
         * Encodes the specified Response message. Does not implicitly {@link commands.Response.verify|verify} messages.
         * @param message Response message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Response message, length delimited. Does not implicitly {@link commands.Response.verify|verify} messages.
         * @param message Response message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Response message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.Response;

        /**
         * Decodes a Response message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.Response;

        /**
         * Verifies a Response message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Response message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Response
         */
        public static fromObject(object: { [k: string]: any }): commands.Response;

        /**
         * Creates a plain object from a Response message. Also converts values to other types if specified.
         * @param message Response
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Response to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Response
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an IncrementCommand. */
    interface IIncrementCommand {
    }

    /** Represents an IncrementCommand. */
    class IncrementCommand implements IIncrementCommand {

        /**
         * Constructs a new IncrementCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IIncrementCommand);

        /**
         * Creates a new IncrementCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IncrementCommand instance
         */
        public static create(properties?: commands.IIncrementCommand): commands.IncrementCommand;

        /**
         * Encodes the specified IncrementCommand message. Does not implicitly {@link commands.IncrementCommand.verify|verify} messages.
         * @param message IncrementCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IIncrementCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IncrementCommand message, length delimited. Does not implicitly {@link commands.IncrementCommand.verify|verify} messages.
         * @param message IncrementCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IIncrementCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IncrementCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IncrementCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.IncrementCommand;

        /**
         * Decodes an IncrementCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IncrementCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.IncrementCommand;

        /**
         * Verifies an IncrementCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IncrementCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IncrementCommand
         */
        public static fromObject(object: { [k: string]: any }): commands.IncrementCommand;

        /**
         * Creates a plain object from an IncrementCommand message. Also converts values to other types if specified.
         * @param message IncrementCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.IncrementCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IncrementCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for IncrementCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DecrementCommand. */
    interface IDecrementCommand {
    }

    /** Represents a DecrementCommand. */
    class DecrementCommand implements IDecrementCommand {

        /**
         * Constructs a new DecrementCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IDecrementCommand);

        /**
         * Creates a new DecrementCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DecrementCommand instance
         */
        public static create(properties?: commands.IDecrementCommand): commands.DecrementCommand;

        /**
         * Encodes the specified DecrementCommand message. Does not implicitly {@link commands.DecrementCommand.verify|verify} messages.
         * @param message DecrementCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IDecrementCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DecrementCommand message, length delimited. Does not implicitly {@link commands.DecrementCommand.verify|verify} messages.
         * @param message DecrementCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IDecrementCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DecrementCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DecrementCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.DecrementCommand;

        /**
         * Decodes a DecrementCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DecrementCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.DecrementCommand;

        /**
         * Verifies a DecrementCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DecrementCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DecrementCommand
         */
        public static fromObject(object: { [k: string]: any }): commands.DecrementCommand;

        /**
         * Creates a plain object from a DecrementCommand message. Also converts values to other types if specified.
         * @param message DecrementCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.DecrementCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DecrementCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DecrementCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SetCounterCommand. */
    interface ISetCounterCommand {

        /** SetCounterCommand value */
        value?: (number|null);
    }

    /** Represents a SetCounterCommand. */
    class SetCounterCommand implements ISetCounterCommand {

        /**
         * Constructs a new SetCounterCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.ISetCounterCommand);

        /** SetCounterCommand value. */
        public value: number;

        /**
         * Creates a new SetCounterCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SetCounterCommand instance
         */
        public static create(properties?: commands.ISetCounterCommand): commands.SetCounterCommand;

        /**
         * Encodes the specified SetCounterCommand message. Does not implicitly {@link commands.SetCounterCommand.verify|verify} messages.
         * @param message SetCounterCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.ISetCounterCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SetCounterCommand message, length delimited. Does not implicitly {@link commands.SetCounterCommand.verify|verify} messages.
         * @param message SetCounterCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.ISetCounterCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SetCounterCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SetCounterCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.SetCounterCommand;

        /**
         * Decodes a SetCounterCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SetCounterCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.SetCounterCommand;

        /**
         * Verifies a SetCounterCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SetCounterCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SetCounterCommand
         */
        public static fromObject(object: { [k: string]: any }): commands.SetCounterCommand;

        /**
         * Creates a plain object from a SetCounterCommand message. Also converts values to other types if specified.
         * @param message SetCounterCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.SetCounterCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SetCounterCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SetCounterCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetCounterCommand. */
    interface IGetCounterCommand {
    }

    /** Represents a GetCounterCommand. */
    class GetCounterCommand implements IGetCounterCommand {

        /**
         * Constructs a new GetCounterCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IGetCounterCommand);

        /**
         * Creates a new GetCounterCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetCounterCommand instance
         */
        public static create(properties?: commands.IGetCounterCommand): commands.GetCounterCommand;

        /**
         * Encodes the specified GetCounterCommand message. Does not implicitly {@link commands.GetCounterCommand.verify|verify} messages.
         * @param message GetCounterCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IGetCounterCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetCounterCommand message, length delimited. Does not implicitly {@link commands.GetCounterCommand.verify|verify} messages.
         * @param message GetCounterCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IGetCounterCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetCounterCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetCounterCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.GetCounterCommand;

        /**
         * Decodes a GetCounterCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetCounterCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.GetCounterCommand;

        /**
         * Verifies a GetCounterCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetCounterCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetCounterCommand
         */
        public static fromObject(object: { [k: string]: any }): commands.GetCounterCommand;

        /**
         * Creates a plain object from a GetCounterCommand message. Also converts values to other types if specified.
         * @param message GetCounterCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.GetCounterCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetCounterCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetCounterCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AddUserCommand. */
    interface IAddUserCommand {

        /** AddUserCommand name */
        name?: (string|null);

        /** AddUserCommand email */
        email?: (string|null);
    }

    /** Represents an AddUserCommand. */
    class AddUserCommand implements IAddUserCommand {

        /**
         * Constructs a new AddUserCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IAddUserCommand);

        /** AddUserCommand name. */
        public name: string;

        /** AddUserCommand email. */
        public email: string;

        /**
         * Creates a new AddUserCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AddUserCommand instance
         */
        public static create(properties?: commands.IAddUserCommand): commands.AddUserCommand;

        /**
         * Encodes the specified AddUserCommand message. Does not implicitly {@link commands.AddUserCommand.verify|verify} messages.
         * @param message AddUserCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IAddUserCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AddUserCommand message, length delimited. Does not implicitly {@link commands.AddUserCommand.verify|verify} messages.
         * @param message AddUserCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IAddUserCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AddUserCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AddUserCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.AddUserCommand;

        /**
         * Decodes an AddUserCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AddUserCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.AddUserCommand;

        /**
         * Verifies an AddUserCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AddUserCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AddUserCommand
         */
        public static fromObject(object: { [k: string]: any }): commands.AddUserCommand;

        /**
         * Creates a plain object from an AddUserCommand message. Also converts values to other types if specified.
         * @param message AddUserCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.AddUserCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AddUserCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AddUserCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RemoveUserCommand. */
    interface IRemoveUserCommand {

        /** RemoveUserCommand id */
        id?: (string|null);
    }

    /** Represents a RemoveUserCommand. */
    class RemoveUserCommand implements IRemoveUserCommand {

        /**
         * Constructs a new RemoveUserCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IRemoveUserCommand);

        /** RemoveUserCommand id. */
        public id: string;

        /**
         * Creates a new RemoveUserCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoveUserCommand instance
         */
        public static create(properties?: commands.IRemoveUserCommand): commands.RemoveUserCommand;

        /**
         * Encodes the specified RemoveUserCommand message. Does not implicitly {@link commands.RemoveUserCommand.verify|verify} messages.
         * @param message RemoveUserCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IRemoveUserCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoveUserCommand message, length delimited. Does not implicitly {@link commands.RemoveUserCommand.verify|verify} messages.
         * @param message RemoveUserCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IRemoveUserCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoveUserCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RemoveUserCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.RemoveUserCommand;

        /**
         * Decodes a RemoveUserCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RemoveUserCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.RemoveUserCommand;

        /**
         * Verifies a RemoveUserCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoveUserCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoveUserCommand
         */
        public static fromObject(object: { [k: string]: any }): commands.RemoveUserCommand;

        /**
         * Creates a plain object from a RemoveUserCommand message. Also converts values to other types if specified.
         * @param message RemoveUserCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.RemoveUserCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoveUserCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RemoveUserCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetUsersCommand. */
    interface IGetUsersCommand {
    }

    /** Represents a GetUsersCommand. */
    class GetUsersCommand implements IGetUsersCommand {

        /**
         * Constructs a new GetUsersCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IGetUsersCommand);

        /**
         * Creates a new GetUsersCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetUsersCommand instance
         */
        public static create(properties?: commands.IGetUsersCommand): commands.GetUsersCommand;

        /**
         * Encodes the specified GetUsersCommand message. Does not implicitly {@link commands.GetUsersCommand.verify|verify} messages.
         * @param message GetUsersCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IGetUsersCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetUsersCommand message, length delimited. Does not implicitly {@link commands.GetUsersCommand.verify|verify} messages.
         * @param message GetUsersCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IGetUsersCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetUsersCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetUsersCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.GetUsersCommand;

        /**
         * Decodes a GetUsersCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetUsersCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.GetUsersCommand;

        /**
         * Verifies a GetUsersCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetUsersCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetUsersCommand
         */
        public static fromObject(object: { [k: string]: any }): commands.GetUsersCommand;

        /**
         * Creates a plain object from a GetUsersCommand message. Also converts values to other types if specified.
         * @param message GetUsersCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.GetUsersCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetUsersCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetUsersCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CalculateSumCommand. */
    interface ICalculateSumCommand {

        /** CalculateSumCommand a */
        a?: (number|null);

        /** CalculateSumCommand b */
        b?: (number|null);
    }

    /** Represents a CalculateSumCommand. */
    class CalculateSumCommand implements ICalculateSumCommand {

        /**
         * Constructs a new CalculateSumCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.ICalculateSumCommand);

        /** CalculateSumCommand a. */
        public a: number;

        /** CalculateSumCommand b. */
        public b: number;

        /**
         * Creates a new CalculateSumCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CalculateSumCommand instance
         */
        public static create(properties?: commands.ICalculateSumCommand): commands.CalculateSumCommand;

        /**
         * Encodes the specified CalculateSumCommand message. Does not implicitly {@link commands.CalculateSumCommand.verify|verify} messages.
         * @param message CalculateSumCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.ICalculateSumCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CalculateSumCommand message, length delimited. Does not implicitly {@link commands.CalculateSumCommand.verify|verify} messages.
         * @param message CalculateSumCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.ICalculateSumCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CalculateSumCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CalculateSumCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.CalculateSumCommand;

        /**
         * Decodes a CalculateSumCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CalculateSumCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.CalculateSumCommand;

        /**
         * Verifies a CalculateSumCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CalculateSumCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CalculateSumCommand
         */
        public static fromObject(object: { [k: string]: any }): commands.CalculateSumCommand;

        /**
         * Creates a plain object from a CalculateSumCommand message. Also converts values to other types if specified.
         * @param message CalculateSumCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.CalculateSumCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CalculateSumCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CalculateSumCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ValidateInputCommand. */
    interface IValidateInputCommand {

        /** ValidateInputCommand email */
        email?: (string|null);

        /** ValidateInputCommand password */
        password?: (string|null);
    }

    /** Represents a ValidateInputCommand. */
    class ValidateInputCommand implements IValidateInputCommand {

        /**
         * Constructs a new ValidateInputCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IValidateInputCommand);

        /** ValidateInputCommand email. */
        public email: string;

        /** ValidateInputCommand password. */
        public password: string;

        /**
         * Creates a new ValidateInputCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ValidateInputCommand instance
         */
        public static create(properties?: commands.IValidateInputCommand): commands.ValidateInputCommand;

        /**
         * Encodes the specified ValidateInputCommand message. Does not implicitly {@link commands.ValidateInputCommand.verify|verify} messages.
         * @param message ValidateInputCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IValidateInputCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ValidateInputCommand message, length delimited. Does not implicitly {@link commands.ValidateInputCommand.verify|verify} messages.
         * @param message ValidateInputCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IValidateInputCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ValidateInputCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ValidateInputCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.ValidateInputCommand;

        /**
         * Decodes a ValidateInputCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ValidateInputCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.ValidateInputCommand;

        /**
         * Verifies a ValidateInputCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ValidateInputCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ValidateInputCommand
         */
        public static fromObject(object: { [k: string]: any }): commands.ValidateInputCommand;

        /**
         * Creates a plain object from a ValidateInputCommand message. Also converts values to other types if specified.
         * @param message ValidateInputCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.ValidateInputCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ValidateInputCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ValidateInputCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a FetchUserDataCommand. */
    interface IFetchUserDataCommand {

        /** FetchUserDataCommand userId */
        userId?: (string|null);
    }

    /** Represents a FetchUserDataCommand. */
    class FetchUserDataCommand implements IFetchUserDataCommand {

        /**
         * Constructs a new FetchUserDataCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IFetchUserDataCommand);

        /** FetchUserDataCommand userId. */
        public userId: string;

        /**
         * Creates a new FetchUserDataCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FetchUserDataCommand instance
         */
        public static create(properties?: commands.IFetchUserDataCommand): commands.FetchUserDataCommand;

        /**
         * Encodes the specified FetchUserDataCommand message. Does not implicitly {@link commands.FetchUserDataCommand.verify|verify} messages.
         * @param message FetchUserDataCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IFetchUserDataCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FetchUserDataCommand message, length delimited. Does not implicitly {@link commands.FetchUserDataCommand.verify|verify} messages.
         * @param message FetchUserDataCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IFetchUserDataCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FetchUserDataCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FetchUserDataCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.FetchUserDataCommand;

        /**
         * Decodes a FetchUserDataCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FetchUserDataCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.FetchUserDataCommand;

        /**
         * Verifies a FetchUserDataCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FetchUserDataCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FetchUserDataCommand
         */
        public static fromObject(object: { [k: string]: any }): commands.FetchUserDataCommand;

        /**
         * Creates a plain object from a FetchUserDataCommand message. Also converts values to other types if specified.
         * @param message FetchUserDataCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.FetchUserDataCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FetchUserDataCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for FetchUserDataCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetConfigurationCommand. */
    interface IGetConfigurationCommand {
    }

    /** Represents a GetConfigurationCommand. */
    class GetConfigurationCommand implements IGetConfigurationCommand {

        /**
         * Constructs a new GetConfigurationCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IGetConfigurationCommand);

        /**
         * Creates a new GetConfigurationCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetConfigurationCommand instance
         */
        public static create(properties?: commands.IGetConfigurationCommand): commands.GetConfigurationCommand;

        /**
         * Encodes the specified GetConfigurationCommand message. Does not implicitly {@link commands.GetConfigurationCommand.verify|verify} messages.
         * @param message GetConfigurationCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IGetConfigurationCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetConfigurationCommand message, length delimited. Does not implicitly {@link commands.GetConfigurationCommand.verify|verify} messages.
         * @param message GetConfigurationCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IGetConfigurationCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetConfigurationCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetConfigurationCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.GetConfigurationCommand;

        /**
         * Decodes a GetConfigurationCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetConfigurationCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.GetConfigurationCommand;

        /**
         * Verifies a GetConfigurationCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetConfigurationCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetConfigurationCommand
         */
        public static fromObject(object: { [k: string]: any }): commands.GetConfigurationCommand;

        /**
         * Creates a plain object from a GetConfigurationCommand message. Also converts values to other types if specified.
         * @param message GetConfigurationCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.GetConfigurationCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetConfigurationCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetConfigurationCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an UpdateConfigurationCommand. */
    interface IUpdateConfigurationCommand {

        /** UpdateConfigurationCommand config */
        config?: (commands.IConfiguration|null);
    }

    /** Represents an UpdateConfigurationCommand. */
    class UpdateConfigurationCommand implements IUpdateConfigurationCommand {

        /**
         * Constructs a new UpdateConfigurationCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IUpdateConfigurationCommand);

        /** UpdateConfigurationCommand config. */
        public config?: (commands.IConfiguration|null);

        /**
         * Creates a new UpdateConfigurationCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpdateConfigurationCommand instance
         */
        public static create(properties?: commands.IUpdateConfigurationCommand): commands.UpdateConfigurationCommand;

        /**
         * Encodes the specified UpdateConfigurationCommand message. Does not implicitly {@link commands.UpdateConfigurationCommand.verify|verify} messages.
         * @param message UpdateConfigurationCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IUpdateConfigurationCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpdateConfigurationCommand message, length delimited. Does not implicitly {@link commands.UpdateConfigurationCommand.verify|verify} messages.
         * @param message UpdateConfigurationCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IUpdateConfigurationCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpdateConfigurationCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpdateConfigurationCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.UpdateConfigurationCommand;

        /**
         * Decodes an UpdateConfigurationCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpdateConfigurationCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.UpdateConfigurationCommand;

        /**
         * Verifies an UpdateConfigurationCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpdateConfigurationCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpdateConfigurationCommand
         */
        public static fromObject(object: { [k: string]: any }): commands.UpdateConfigurationCommand;

        /**
         * Creates a plain object from an UpdateConfigurationCommand message. Also converts values to other types if specified.
         * @param message UpdateConfigurationCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.UpdateConfigurationCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpdateConfigurationCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UpdateConfigurationCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetStateCommand. */
    interface IGetStateCommand {
    }

    /** Represents a GetStateCommand. */
    class GetStateCommand implements IGetStateCommand {

        /**
         * Constructs a new GetStateCommand.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IGetStateCommand);

        /**
         * Creates a new GetStateCommand instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetStateCommand instance
         */
        public static create(properties?: commands.IGetStateCommand): commands.GetStateCommand;

        /**
         * Encodes the specified GetStateCommand message. Does not implicitly {@link commands.GetStateCommand.verify|verify} messages.
         * @param message GetStateCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IGetStateCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetStateCommand message, length delimited. Does not implicitly {@link commands.GetStateCommand.verify|verify} messages.
         * @param message GetStateCommand message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IGetStateCommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetStateCommand message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetStateCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.GetStateCommand;

        /**
         * Decodes a GetStateCommand message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetStateCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.GetStateCommand;

        /**
         * Verifies a GetStateCommand message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetStateCommand message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetStateCommand
         */
        public static fromObject(object: { [k: string]: any }): commands.GetStateCommand;

        /**
         * Creates a plain object from a GetStateCommand message. Also converts values to other types if specified.
         * @param message GetStateCommand
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.GetStateCommand, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetStateCommand to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetStateCommand
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an ErrorResponse. */
    interface IErrorResponse {

        /** ErrorResponse message */
        message?: (string|null);
    }

    /** Represents an ErrorResponse. */
    class ErrorResponse implements IErrorResponse {

        /**
         * Constructs a new ErrorResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IErrorResponse);

        /** ErrorResponse message. */
        public message: string;

        /**
         * Creates a new ErrorResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ErrorResponse instance
         */
        public static create(properties?: commands.IErrorResponse): commands.ErrorResponse;

        /**
         * Encodes the specified ErrorResponse message. Does not implicitly {@link commands.ErrorResponse.verify|verify} messages.
         * @param message ErrorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IErrorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ErrorResponse message, length delimited. Does not implicitly {@link commands.ErrorResponse.verify|verify} messages.
         * @param message ErrorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IErrorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.ErrorResponse;

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.ErrorResponse;

        /**
         * Verifies an ErrorResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ErrorResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ErrorResponse
         */
        public static fromObject(object: { [k: string]: any }): commands.ErrorResponse;

        /**
         * Creates a plain object from an ErrorResponse message. Also converts values to other types if specified.
         * @param message ErrorResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.ErrorResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ErrorResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ErrorResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CounterResponse. */
    interface ICounterResponse {

        /** CounterResponse value */
        value?: (number|null);
    }

    /** Represents a CounterResponse. */
    class CounterResponse implements ICounterResponse {

        /**
         * Constructs a new CounterResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.ICounterResponse);

        /** CounterResponse value. */
        public value: number;

        /**
         * Creates a new CounterResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CounterResponse instance
         */
        public static create(properties?: commands.ICounterResponse): commands.CounterResponse;

        /**
         * Encodes the specified CounterResponse message. Does not implicitly {@link commands.CounterResponse.verify|verify} messages.
         * @param message CounterResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.ICounterResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CounterResponse message, length delimited. Does not implicitly {@link commands.CounterResponse.verify|verify} messages.
         * @param message CounterResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.ICounterResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CounterResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CounterResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.CounterResponse;

        /**
         * Decodes a CounterResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CounterResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.CounterResponse;

        /**
         * Verifies a CounterResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CounterResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CounterResponse
         */
        public static fromObject(object: { [k: string]: any }): commands.CounterResponse;

        /**
         * Creates a plain object from a CounterResponse message. Also converts values to other types if specified.
         * @param message CounterResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.CounterResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CounterResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CounterResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a UserResponse. */
    interface IUserResponse {

        /** UserResponse user */
        user?: (commands.IUser|null);
    }

    /** Represents a UserResponse. */
    class UserResponse implements IUserResponse {

        /**
         * Constructs a new UserResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IUserResponse);

        /** UserResponse user. */
        public user?: (commands.IUser|null);

        /**
         * Creates a new UserResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserResponse instance
         */
        public static create(properties?: commands.IUserResponse): commands.UserResponse;

        /**
         * Encodes the specified UserResponse message. Does not implicitly {@link commands.UserResponse.verify|verify} messages.
         * @param message UserResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IUserResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserResponse message, length delimited. Does not implicitly {@link commands.UserResponse.verify|verify} messages.
         * @param message UserResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IUserResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.UserResponse;

        /**
         * Decodes a UserResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.UserResponse;

        /**
         * Verifies a UserResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserResponse
         */
        public static fromObject(object: { [k: string]: any }): commands.UserResponse;

        /**
         * Creates a plain object from a UserResponse message. Also converts values to other types if specified.
         * @param message UserResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.UserResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UserResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a UsersResponse. */
    interface IUsersResponse {

        /** UsersResponse users */
        users?: (commands.IUser[]|null);
    }

    /** Represents a UsersResponse. */
    class UsersResponse implements IUsersResponse {

        /**
         * Constructs a new UsersResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IUsersResponse);

        /** UsersResponse users. */
        public users: commands.IUser[];

        /**
         * Creates a new UsersResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UsersResponse instance
         */
        public static create(properties?: commands.IUsersResponse): commands.UsersResponse;

        /**
         * Encodes the specified UsersResponse message. Does not implicitly {@link commands.UsersResponse.verify|verify} messages.
         * @param message UsersResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IUsersResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UsersResponse message, length delimited. Does not implicitly {@link commands.UsersResponse.verify|verify} messages.
         * @param message UsersResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IUsersResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UsersResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UsersResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.UsersResponse;

        /**
         * Decodes a UsersResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UsersResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.UsersResponse;

        /**
         * Verifies a UsersResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UsersResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UsersResponse
         */
        public static fromObject(object: { [k: string]: any }): commands.UsersResponse;

        /**
         * Creates a plain object from a UsersResponse message. Also converts values to other types if specified.
         * @param message UsersResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.UsersResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UsersResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UsersResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SuccessResponse. */
    interface ISuccessResponse {

        /** SuccessResponse success */
        success?: (boolean|null);
    }

    /** Represents a SuccessResponse. */
    class SuccessResponse implements ISuccessResponse {

        /**
         * Constructs a new SuccessResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.ISuccessResponse);

        /** SuccessResponse success. */
        public success: boolean;

        /**
         * Creates a new SuccessResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SuccessResponse instance
         */
        public static create(properties?: commands.ISuccessResponse): commands.SuccessResponse;

        /**
         * Encodes the specified SuccessResponse message. Does not implicitly {@link commands.SuccessResponse.verify|verify} messages.
         * @param message SuccessResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.ISuccessResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SuccessResponse message, length delimited. Does not implicitly {@link commands.SuccessResponse.verify|verify} messages.
         * @param message SuccessResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.ISuccessResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SuccessResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SuccessResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.SuccessResponse;

        /**
         * Decodes a SuccessResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SuccessResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.SuccessResponse;

        /**
         * Verifies a SuccessResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SuccessResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SuccessResponse
         */
        public static fromObject(object: { [k: string]: any }): commands.SuccessResponse;

        /**
         * Creates a plain object from a SuccessResponse message. Also converts values to other types if specified.
         * @param message SuccessResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.SuccessResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SuccessResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SuccessResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SumResponse. */
    interface ISumResponse {

        /** SumResponse result */
        result?: (number|null);
    }

    /** Represents a SumResponse. */
    class SumResponse implements ISumResponse {

        /**
         * Constructs a new SumResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.ISumResponse);

        /** SumResponse result. */
        public result: number;

        /**
         * Creates a new SumResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SumResponse instance
         */
        public static create(properties?: commands.ISumResponse): commands.SumResponse;

        /**
         * Encodes the specified SumResponse message. Does not implicitly {@link commands.SumResponse.verify|verify} messages.
         * @param message SumResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.ISumResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SumResponse message, length delimited. Does not implicitly {@link commands.SumResponse.verify|verify} messages.
         * @param message SumResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.ISumResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SumResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SumResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.SumResponse;

        /**
         * Decodes a SumResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SumResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.SumResponse;

        /**
         * Verifies a SumResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SumResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SumResponse
         */
        public static fromObject(object: { [k: string]: any }): commands.SumResponse;

        /**
         * Creates a plain object from a SumResponse message. Also converts values to other types if specified.
         * @param message SumResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.SumResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SumResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SumResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ValidationResponse. */
    interface IValidationResponse {

        /** ValidationResponse isValid */
        isValid?: (boolean|null);

        /** ValidationResponse errors */
        errors?: (string[]|null);
    }

    /** Represents a ValidationResponse. */
    class ValidationResponse implements IValidationResponse {

        /**
         * Constructs a new ValidationResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IValidationResponse);

        /** ValidationResponse isValid. */
        public isValid: boolean;

        /** ValidationResponse errors. */
        public errors: string[];

        /**
         * Creates a new ValidationResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ValidationResponse instance
         */
        public static create(properties?: commands.IValidationResponse): commands.ValidationResponse;

        /**
         * Encodes the specified ValidationResponse message. Does not implicitly {@link commands.ValidationResponse.verify|verify} messages.
         * @param message ValidationResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IValidationResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ValidationResponse message, length delimited. Does not implicitly {@link commands.ValidationResponse.verify|verify} messages.
         * @param message ValidationResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IValidationResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ValidationResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ValidationResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.ValidationResponse;

        /**
         * Decodes a ValidationResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ValidationResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.ValidationResponse;

        /**
         * Verifies a ValidationResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ValidationResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ValidationResponse
         */
        public static fromObject(object: { [k: string]: any }): commands.ValidationResponse;

        /**
         * Creates a plain object from a ValidationResponse message. Also converts values to other types if specified.
         * @param message ValidationResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.ValidationResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ValidationResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ValidationResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ConfigurationResponse. */
    interface IConfigurationResponse {

        /** ConfigurationResponse config */
        config?: (commands.IConfiguration|null);
    }

    /** Represents a ConfigurationResponse. */
    class ConfigurationResponse implements IConfigurationResponse {

        /**
         * Constructs a new ConfigurationResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IConfigurationResponse);

        /** ConfigurationResponse config. */
        public config?: (commands.IConfiguration|null);

        /**
         * Creates a new ConfigurationResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ConfigurationResponse instance
         */
        public static create(properties?: commands.IConfigurationResponse): commands.ConfigurationResponse;

        /**
         * Encodes the specified ConfigurationResponse message. Does not implicitly {@link commands.ConfigurationResponse.verify|verify} messages.
         * @param message ConfigurationResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IConfigurationResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ConfigurationResponse message, length delimited. Does not implicitly {@link commands.ConfigurationResponse.verify|verify} messages.
         * @param message ConfigurationResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IConfigurationResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ConfigurationResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ConfigurationResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.ConfigurationResponse;

        /**
         * Decodes a ConfigurationResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ConfigurationResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.ConfigurationResponse;

        /**
         * Verifies a ConfigurationResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ConfigurationResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ConfigurationResponse
         */
        public static fromObject(object: { [k: string]: any }): commands.ConfigurationResponse;

        /**
         * Creates a plain object from a ConfigurationResponse message. Also converts values to other types if specified.
         * @param message ConfigurationResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.ConfigurationResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ConfigurationResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ConfigurationResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a StateResponse. */
    interface IStateResponse {

        /** StateResponse counter */
        counter?: (number|null);

        /** StateResponse users */
        users?: (commands.IUser[]|null);

        /** StateResponse config */
        config?: (commands.IConfiguration|null);
    }

    /** Represents a StateResponse. */
    class StateResponse implements IStateResponse {

        /**
         * Constructs a new StateResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IStateResponse);

        /** StateResponse counter. */
        public counter: number;

        /** StateResponse users. */
        public users: commands.IUser[];

        /** StateResponse config. */
        public config?: (commands.IConfiguration|null);

        /**
         * Creates a new StateResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StateResponse instance
         */
        public static create(properties?: commands.IStateResponse): commands.StateResponse;

        /**
         * Encodes the specified StateResponse message. Does not implicitly {@link commands.StateResponse.verify|verify} messages.
         * @param message StateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IStateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StateResponse message, length delimited. Does not implicitly {@link commands.StateResponse.verify|verify} messages.
         * @param message StateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IStateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StateResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.StateResponse;

        /**
         * Decodes a StateResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.StateResponse;

        /**
         * Verifies a StateResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StateResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StateResponse
         */
        public static fromObject(object: { [k: string]: any }): commands.StateResponse;

        /**
         * Creates a plain object from a StateResponse message. Also converts values to other types if specified.
         * @param message StateResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.StateResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StateResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for StateResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a User. */
    interface IUser {

        /** User id */
        id?: (string|null);

        /** User name */
        name?: (string|null);

        /** User email */
        email?: (string|null);

        /** User createdAt */
        createdAt?: (number|Long|null);
    }

    /** Represents a User. */
    class User implements IUser {

        /**
         * Constructs a new User.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IUser);

        /** User id. */
        public id: string;

        /** User name. */
        public name: string;

        /** User email. */
        public email: string;

        /** User createdAt. */
        public createdAt: (number|Long);

        /**
         * Creates a new User instance using the specified properties.
         * @param [properties] Properties to set
         * @returns User instance
         */
        public static create(properties?: commands.IUser): commands.User;

        /**
         * Encodes the specified User message. Does not implicitly {@link commands.User.verify|verify} messages.
         * @param message User message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link commands.User.verify|verify} messages.
         * @param message User message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a User message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.User;

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.User;

        /**
         * Verifies a User message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns User
         */
        public static fromObject(object: { [k: string]: any }): commands.User;

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @param message User
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.User, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this User to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for User
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Configuration. */
    interface IConfiguration {

        /** Configuration version */
        version?: (string|null);

        /** Configuration features */
        features?: (commands.IFeatures|null);

        /** Configuration apiEndpoint */
        apiEndpoint?: (string|null);

        /** Configuration maxRetries */
        maxRetries?: (number|null);
    }

    /** Represents a Configuration. */
    class Configuration implements IConfiguration {

        /**
         * Constructs a new Configuration.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IConfiguration);

        /** Configuration version. */
        public version: string;

        /** Configuration features. */
        public features?: (commands.IFeatures|null);

        /** Configuration apiEndpoint. */
        public apiEndpoint: string;

        /** Configuration maxRetries. */
        public maxRetries: number;

        /**
         * Creates a new Configuration instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Configuration instance
         */
        public static create(properties?: commands.IConfiguration): commands.Configuration;

        /**
         * Encodes the specified Configuration message. Does not implicitly {@link commands.Configuration.verify|verify} messages.
         * @param message Configuration message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IConfiguration, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Configuration message, length delimited. Does not implicitly {@link commands.Configuration.verify|verify} messages.
         * @param message Configuration message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IConfiguration, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Configuration message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Configuration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.Configuration;

        /**
         * Decodes a Configuration message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Configuration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.Configuration;

        /**
         * Verifies a Configuration message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Configuration message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Configuration
         */
        public static fromObject(object: { [k: string]: any }): commands.Configuration;

        /**
         * Creates a plain object from a Configuration message. Also converts values to other types if specified.
         * @param message Configuration
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.Configuration, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Configuration to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Configuration
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Features. */
    interface IFeatures {

        /** Features analytics */
        analytics?: (boolean|null);

        /** Features notifications */
        notifications?: (boolean|null);

        /** Features darkMode */
        darkMode?: (boolean|null);
    }

    /** Represents a Features. */
    class Features implements IFeatures {

        /**
         * Constructs a new Features.
         * @param [properties] Properties to set
         */
        constructor(properties?: commands.IFeatures);

        /** Features analytics. */
        public analytics: boolean;

        /** Features notifications. */
        public notifications: boolean;

        /** Features darkMode. */
        public darkMode: boolean;

        /**
         * Creates a new Features instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Features instance
         */
        public static create(properties?: commands.IFeatures): commands.Features;

        /**
         * Encodes the specified Features message. Does not implicitly {@link commands.Features.verify|verify} messages.
         * @param message Features message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: commands.IFeatures, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Features message, length delimited. Does not implicitly {@link commands.Features.verify|verify} messages.
         * @param message Features message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: commands.IFeatures, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Features message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Features
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): commands.Features;

        /**
         * Decodes a Features message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Features
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): commands.Features;

        /**
         * Verifies a Features message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Features message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Features
         */
        public static fromObject(object: { [k: string]: any }): commands.Features;

        /**
         * Creates a plain object from a Features message. Also converts values to other types if specified.
         * @param message Features
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: commands.Features, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Features to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Features
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
