/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const commands = $root.commands = (() => {

    /**
     * Namespace commands.
     * @exports commands
     * @namespace
     */
    const commands = {};

    commands.Command = (function() {

        /**
         * Properties of a Command.
         * @memberof commands
         * @interface ICommand
         * @property {string|null} [callbackId] Command callbackId
         * @property {commands.IIncrementCommand|null} [increment] Command increment
         * @property {commands.IDecrementCommand|null} [decrement] Command decrement
         * @property {commands.ISetCounterCommand|null} [setCounter] Command setCounter
         * @property {commands.IGetCounterCommand|null} [getCounter] Command getCounter
         * @property {commands.IAddUserCommand|null} [addUser] Command addUser
         * @property {commands.IRemoveUserCommand|null} [removeUser] Command removeUser
         * @property {commands.IGetUsersCommand|null} [getUsers] Command getUsers
         * @property {commands.ICalculateSumCommand|null} [calculateSum] Command calculateSum
         * @property {commands.IValidateInputCommand|null} [validateInput] Command validateInput
         * @property {commands.IFetchUserDataCommand|null} [fetchUserData] Command fetchUserData
         * @property {commands.IGetConfigurationCommand|null} [getConfiguration] Command getConfiguration
         * @property {commands.IUpdateConfigurationCommand|null} [updateConfiguration] Command updateConfiguration
         * @property {commands.IGetStateCommand|null} [getState] Command getState
         */

        /**
         * Constructs a new Command.
         * @memberof commands
         * @classdesc Represents a Command.
         * @implements ICommand
         * @constructor
         * @param {commands.ICommand=} [properties] Properties to set
         */
        function Command(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Command callbackId.
         * @member {string} callbackId
         * @memberof commands.Command
         * @instance
         */
        Command.prototype.callbackId = "";

        /**
         * Command increment.
         * @member {commands.IIncrementCommand|null|undefined} increment
         * @memberof commands.Command
         * @instance
         */
        Command.prototype.increment = null;

        /**
         * Command decrement.
         * @member {commands.IDecrementCommand|null|undefined} decrement
         * @memberof commands.Command
         * @instance
         */
        Command.prototype.decrement = null;

        /**
         * Command setCounter.
         * @member {commands.ISetCounterCommand|null|undefined} setCounter
         * @memberof commands.Command
         * @instance
         */
        Command.prototype.setCounter = null;

        /**
         * Command getCounter.
         * @member {commands.IGetCounterCommand|null|undefined} getCounter
         * @memberof commands.Command
         * @instance
         */
        Command.prototype.getCounter = null;

        /**
         * Command addUser.
         * @member {commands.IAddUserCommand|null|undefined} addUser
         * @memberof commands.Command
         * @instance
         */
        Command.prototype.addUser = null;

        /**
         * Command removeUser.
         * @member {commands.IRemoveUserCommand|null|undefined} removeUser
         * @memberof commands.Command
         * @instance
         */
        Command.prototype.removeUser = null;

        /**
         * Command getUsers.
         * @member {commands.IGetUsersCommand|null|undefined} getUsers
         * @memberof commands.Command
         * @instance
         */
        Command.prototype.getUsers = null;

        /**
         * Command calculateSum.
         * @member {commands.ICalculateSumCommand|null|undefined} calculateSum
         * @memberof commands.Command
         * @instance
         */
        Command.prototype.calculateSum = null;

        /**
         * Command validateInput.
         * @member {commands.IValidateInputCommand|null|undefined} validateInput
         * @memberof commands.Command
         * @instance
         */
        Command.prototype.validateInput = null;

        /**
         * Command fetchUserData.
         * @member {commands.IFetchUserDataCommand|null|undefined} fetchUserData
         * @memberof commands.Command
         * @instance
         */
        Command.prototype.fetchUserData = null;

        /**
         * Command getConfiguration.
         * @member {commands.IGetConfigurationCommand|null|undefined} getConfiguration
         * @memberof commands.Command
         * @instance
         */
        Command.prototype.getConfiguration = null;

        /**
         * Command updateConfiguration.
         * @member {commands.IUpdateConfigurationCommand|null|undefined} updateConfiguration
         * @memberof commands.Command
         * @instance
         */
        Command.prototype.updateConfiguration = null;

        /**
         * Command getState.
         * @member {commands.IGetStateCommand|null|undefined} getState
         * @memberof commands.Command
         * @instance
         */
        Command.prototype.getState = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * Command command.
         * @member {"increment"|"decrement"|"setCounter"|"getCounter"|"addUser"|"removeUser"|"getUsers"|"calculateSum"|"validateInput"|"fetchUserData"|"getConfiguration"|"updateConfiguration"|"getState"|undefined} command
         * @memberof commands.Command
         * @instance
         */
        Object.defineProperty(Command.prototype, "command", {
            get: $util.oneOfGetter($oneOfFields = ["increment", "decrement", "setCounter", "getCounter", "addUser", "removeUser", "getUsers", "calculateSum", "validateInput", "fetchUserData", "getConfiguration", "updateConfiguration", "getState"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Command instance using the specified properties.
         * @function create
         * @memberof commands.Command
         * @static
         * @param {commands.ICommand=} [properties] Properties to set
         * @returns {commands.Command} Command instance
         */
        Command.create = function create(properties) {
            return new Command(properties);
        };

        /**
         * Encodes the specified Command message. Does not implicitly {@link commands.Command.verify|verify} messages.
         * @function encode
         * @memberof commands.Command
         * @static
         * @param {commands.ICommand} message Command message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Command.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.callbackId != null && Object.hasOwnProperty.call(message, "callbackId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.callbackId);
            if (message.increment != null && Object.hasOwnProperty.call(message, "increment"))
                $root.commands.IncrementCommand.encode(message.increment, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.decrement != null && Object.hasOwnProperty.call(message, "decrement"))
                $root.commands.DecrementCommand.encode(message.decrement, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.setCounter != null && Object.hasOwnProperty.call(message, "setCounter"))
                $root.commands.SetCounterCommand.encode(message.setCounter, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
            if (message.getCounter != null && Object.hasOwnProperty.call(message, "getCounter"))
                $root.commands.GetCounterCommand.encode(message.getCounter, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
            if (message.addUser != null && Object.hasOwnProperty.call(message, "addUser"))
                $root.commands.AddUserCommand.encode(message.addUser, writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
            if (message.removeUser != null && Object.hasOwnProperty.call(message, "removeUser"))
                $root.commands.RemoveUserCommand.encode(message.removeUser, writer.uint32(/* id 21, wireType 2 =*/170).fork()).ldelim();
            if (message.getUsers != null && Object.hasOwnProperty.call(message, "getUsers"))
                $root.commands.GetUsersCommand.encode(message.getUsers, writer.uint32(/* id 22, wireType 2 =*/178).fork()).ldelim();
            if (message.calculateSum != null && Object.hasOwnProperty.call(message, "calculateSum"))
                $root.commands.CalculateSumCommand.encode(message.calculateSum, writer.uint32(/* id 30, wireType 2 =*/242).fork()).ldelim();
            if (message.validateInput != null && Object.hasOwnProperty.call(message, "validateInput"))
                $root.commands.ValidateInputCommand.encode(message.validateInput, writer.uint32(/* id 40, wireType 2 =*/322).fork()).ldelim();
            if (message.fetchUserData != null && Object.hasOwnProperty.call(message, "fetchUserData"))
                $root.commands.FetchUserDataCommand.encode(message.fetchUserData, writer.uint32(/* id 50, wireType 2 =*/402).fork()).ldelim();
            if (message.getConfiguration != null && Object.hasOwnProperty.call(message, "getConfiguration"))
                $root.commands.GetConfigurationCommand.encode(message.getConfiguration, writer.uint32(/* id 60, wireType 2 =*/482).fork()).ldelim();
            if (message.updateConfiguration != null && Object.hasOwnProperty.call(message, "updateConfiguration"))
                $root.commands.UpdateConfigurationCommand.encode(message.updateConfiguration, writer.uint32(/* id 61, wireType 2 =*/490).fork()).ldelim();
            if (message.getState != null && Object.hasOwnProperty.call(message, "getState"))
                $root.commands.GetStateCommand.encode(message.getState, writer.uint32(/* id 70, wireType 2 =*/562).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Command message, length delimited. Does not implicitly {@link commands.Command.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.Command
         * @static
         * @param {commands.ICommand} message Command message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Command.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Command message from the specified reader or buffer.
         * @function decode
         * @memberof commands.Command
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.Command} Command
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Command.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.Command();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.callbackId = reader.string();
                        break;
                    }
                case 10: {
                        message.increment = $root.commands.IncrementCommand.decode(reader, reader.uint32());
                        break;
                    }
                case 11: {
                        message.decrement = $root.commands.DecrementCommand.decode(reader, reader.uint32());
                        break;
                    }
                case 12: {
                        message.setCounter = $root.commands.SetCounterCommand.decode(reader, reader.uint32());
                        break;
                    }
                case 13: {
                        message.getCounter = $root.commands.GetCounterCommand.decode(reader, reader.uint32());
                        break;
                    }
                case 20: {
                        message.addUser = $root.commands.AddUserCommand.decode(reader, reader.uint32());
                        break;
                    }
                case 21: {
                        message.removeUser = $root.commands.RemoveUserCommand.decode(reader, reader.uint32());
                        break;
                    }
                case 22: {
                        message.getUsers = $root.commands.GetUsersCommand.decode(reader, reader.uint32());
                        break;
                    }
                case 30: {
                        message.calculateSum = $root.commands.CalculateSumCommand.decode(reader, reader.uint32());
                        break;
                    }
                case 40: {
                        message.validateInput = $root.commands.ValidateInputCommand.decode(reader, reader.uint32());
                        break;
                    }
                case 50: {
                        message.fetchUserData = $root.commands.FetchUserDataCommand.decode(reader, reader.uint32());
                        break;
                    }
                case 60: {
                        message.getConfiguration = $root.commands.GetConfigurationCommand.decode(reader, reader.uint32());
                        break;
                    }
                case 61: {
                        message.updateConfiguration = $root.commands.UpdateConfigurationCommand.decode(reader, reader.uint32());
                        break;
                    }
                case 70: {
                        message.getState = $root.commands.GetStateCommand.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Command message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.Command
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.Command} Command
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Command.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Command message.
         * @function verify
         * @memberof commands.Command
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Command.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.callbackId != null && message.hasOwnProperty("callbackId"))
                if (!$util.isString(message.callbackId))
                    return "callbackId: string expected";
            if (message.increment != null && message.hasOwnProperty("increment")) {
                properties.command = 1;
                {
                    let error = $root.commands.IncrementCommand.verify(message.increment);
                    if (error)
                        return "increment." + error;
                }
            }
            if (message.decrement != null && message.hasOwnProperty("decrement")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.commands.DecrementCommand.verify(message.decrement);
                    if (error)
                        return "decrement." + error;
                }
            }
            if (message.setCounter != null && message.hasOwnProperty("setCounter")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.commands.SetCounterCommand.verify(message.setCounter);
                    if (error)
                        return "setCounter." + error;
                }
            }
            if (message.getCounter != null && message.hasOwnProperty("getCounter")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.commands.GetCounterCommand.verify(message.getCounter);
                    if (error)
                        return "getCounter." + error;
                }
            }
            if (message.addUser != null && message.hasOwnProperty("addUser")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.commands.AddUserCommand.verify(message.addUser);
                    if (error)
                        return "addUser." + error;
                }
            }
            if (message.removeUser != null && message.hasOwnProperty("removeUser")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.commands.RemoveUserCommand.verify(message.removeUser);
                    if (error)
                        return "removeUser." + error;
                }
            }
            if (message.getUsers != null && message.hasOwnProperty("getUsers")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.commands.GetUsersCommand.verify(message.getUsers);
                    if (error)
                        return "getUsers." + error;
                }
            }
            if (message.calculateSum != null && message.hasOwnProperty("calculateSum")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.commands.CalculateSumCommand.verify(message.calculateSum);
                    if (error)
                        return "calculateSum." + error;
                }
            }
            if (message.validateInput != null && message.hasOwnProperty("validateInput")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.commands.ValidateInputCommand.verify(message.validateInput);
                    if (error)
                        return "validateInput." + error;
                }
            }
            if (message.fetchUserData != null && message.hasOwnProperty("fetchUserData")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.commands.FetchUserDataCommand.verify(message.fetchUserData);
                    if (error)
                        return "fetchUserData." + error;
                }
            }
            if (message.getConfiguration != null && message.hasOwnProperty("getConfiguration")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.commands.GetConfigurationCommand.verify(message.getConfiguration);
                    if (error)
                        return "getConfiguration." + error;
                }
            }
            if (message.updateConfiguration != null && message.hasOwnProperty("updateConfiguration")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.commands.UpdateConfigurationCommand.verify(message.updateConfiguration);
                    if (error)
                        return "updateConfiguration." + error;
                }
            }
            if (message.getState != null && message.hasOwnProperty("getState")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.commands.GetStateCommand.verify(message.getState);
                    if (error)
                        return "getState." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Command message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.Command
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.Command} Command
         */
        Command.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.Command)
                return object;
            let message = new $root.commands.Command();
            if (object.callbackId != null)
                message.callbackId = String(object.callbackId);
            if (object.increment != null) {
                if (typeof object.increment !== "object")
                    throw TypeError(".commands.Command.increment: object expected");
                message.increment = $root.commands.IncrementCommand.fromObject(object.increment);
            }
            if (object.decrement != null) {
                if (typeof object.decrement !== "object")
                    throw TypeError(".commands.Command.decrement: object expected");
                message.decrement = $root.commands.DecrementCommand.fromObject(object.decrement);
            }
            if (object.setCounter != null) {
                if (typeof object.setCounter !== "object")
                    throw TypeError(".commands.Command.setCounter: object expected");
                message.setCounter = $root.commands.SetCounterCommand.fromObject(object.setCounter);
            }
            if (object.getCounter != null) {
                if (typeof object.getCounter !== "object")
                    throw TypeError(".commands.Command.getCounter: object expected");
                message.getCounter = $root.commands.GetCounterCommand.fromObject(object.getCounter);
            }
            if (object.addUser != null) {
                if (typeof object.addUser !== "object")
                    throw TypeError(".commands.Command.addUser: object expected");
                message.addUser = $root.commands.AddUserCommand.fromObject(object.addUser);
            }
            if (object.removeUser != null) {
                if (typeof object.removeUser !== "object")
                    throw TypeError(".commands.Command.removeUser: object expected");
                message.removeUser = $root.commands.RemoveUserCommand.fromObject(object.removeUser);
            }
            if (object.getUsers != null) {
                if (typeof object.getUsers !== "object")
                    throw TypeError(".commands.Command.getUsers: object expected");
                message.getUsers = $root.commands.GetUsersCommand.fromObject(object.getUsers);
            }
            if (object.calculateSum != null) {
                if (typeof object.calculateSum !== "object")
                    throw TypeError(".commands.Command.calculateSum: object expected");
                message.calculateSum = $root.commands.CalculateSumCommand.fromObject(object.calculateSum);
            }
            if (object.validateInput != null) {
                if (typeof object.validateInput !== "object")
                    throw TypeError(".commands.Command.validateInput: object expected");
                message.validateInput = $root.commands.ValidateInputCommand.fromObject(object.validateInput);
            }
            if (object.fetchUserData != null) {
                if (typeof object.fetchUserData !== "object")
                    throw TypeError(".commands.Command.fetchUserData: object expected");
                message.fetchUserData = $root.commands.FetchUserDataCommand.fromObject(object.fetchUserData);
            }
            if (object.getConfiguration != null) {
                if (typeof object.getConfiguration !== "object")
                    throw TypeError(".commands.Command.getConfiguration: object expected");
                message.getConfiguration = $root.commands.GetConfigurationCommand.fromObject(object.getConfiguration);
            }
            if (object.updateConfiguration != null) {
                if (typeof object.updateConfiguration !== "object")
                    throw TypeError(".commands.Command.updateConfiguration: object expected");
                message.updateConfiguration = $root.commands.UpdateConfigurationCommand.fromObject(object.updateConfiguration);
            }
            if (object.getState != null) {
                if (typeof object.getState !== "object")
                    throw TypeError(".commands.Command.getState: object expected");
                message.getState = $root.commands.GetStateCommand.fromObject(object.getState);
            }
            return message;
        };

        /**
         * Creates a plain object from a Command message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.Command
         * @static
         * @param {commands.Command} message Command
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Command.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.callbackId = "";
            if (message.callbackId != null && message.hasOwnProperty("callbackId"))
                object.callbackId = message.callbackId;
            if (message.increment != null && message.hasOwnProperty("increment")) {
                object.increment = $root.commands.IncrementCommand.toObject(message.increment, options);
                if (options.oneofs)
                    object.command = "increment";
            }
            if (message.decrement != null && message.hasOwnProperty("decrement")) {
                object.decrement = $root.commands.DecrementCommand.toObject(message.decrement, options);
                if (options.oneofs)
                    object.command = "decrement";
            }
            if (message.setCounter != null && message.hasOwnProperty("setCounter")) {
                object.setCounter = $root.commands.SetCounterCommand.toObject(message.setCounter, options);
                if (options.oneofs)
                    object.command = "setCounter";
            }
            if (message.getCounter != null && message.hasOwnProperty("getCounter")) {
                object.getCounter = $root.commands.GetCounterCommand.toObject(message.getCounter, options);
                if (options.oneofs)
                    object.command = "getCounter";
            }
            if (message.addUser != null && message.hasOwnProperty("addUser")) {
                object.addUser = $root.commands.AddUserCommand.toObject(message.addUser, options);
                if (options.oneofs)
                    object.command = "addUser";
            }
            if (message.removeUser != null && message.hasOwnProperty("removeUser")) {
                object.removeUser = $root.commands.RemoveUserCommand.toObject(message.removeUser, options);
                if (options.oneofs)
                    object.command = "removeUser";
            }
            if (message.getUsers != null && message.hasOwnProperty("getUsers")) {
                object.getUsers = $root.commands.GetUsersCommand.toObject(message.getUsers, options);
                if (options.oneofs)
                    object.command = "getUsers";
            }
            if (message.calculateSum != null && message.hasOwnProperty("calculateSum")) {
                object.calculateSum = $root.commands.CalculateSumCommand.toObject(message.calculateSum, options);
                if (options.oneofs)
                    object.command = "calculateSum";
            }
            if (message.validateInput != null && message.hasOwnProperty("validateInput")) {
                object.validateInput = $root.commands.ValidateInputCommand.toObject(message.validateInput, options);
                if (options.oneofs)
                    object.command = "validateInput";
            }
            if (message.fetchUserData != null && message.hasOwnProperty("fetchUserData")) {
                object.fetchUserData = $root.commands.FetchUserDataCommand.toObject(message.fetchUserData, options);
                if (options.oneofs)
                    object.command = "fetchUserData";
            }
            if (message.getConfiguration != null && message.hasOwnProperty("getConfiguration")) {
                object.getConfiguration = $root.commands.GetConfigurationCommand.toObject(message.getConfiguration, options);
                if (options.oneofs)
                    object.command = "getConfiguration";
            }
            if (message.updateConfiguration != null && message.hasOwnProperty("updateConfiguration")) {
                object.updateConfiguration = $root.commands.UpdateConfigurationCommand.toObject(message.updateConfiguration, options);
                if (options.oneofs)
                    object.command = "updateConfiguration";
            }
            if (message.getState != null && message.hasOwnProperty("getState")) {
                object.getState = $root.commands.GetStateCommand.toObject(message.getState, options);
                if (options.oneofs)
                    object.command = "getState";
            }
            return object;
        };

        /**
         * Converts this Command to JSON.
         * @function toJSON
         * @memberof commands.Command
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Command.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Command
         * @function getTypeUrl
         * @memberof commands.Command
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Command.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.Command";
        };

        return Command;
    })();

    commands.Response = (function() {

        /**
         * Properties of a Response.
         * @memberof commands
         * @interface IResponse
         * @property {string|null} [callbackId] Response callbackId
         * @property {commands.IErrorResponse|null} [error] Response error
         * @property {commands.ICounterResponse|null} [counter] Response counter
         * @property {commands.IUserResponse|null} [user] Response user
         * @property {commands.IUsersResponse|null} [users] Response users
         * @property {commands.ISuccessResponse|null} [success] Response success
         * @property {commands.ISumResponse|null} [sum] Response sum
         * @property {commands.IValidationResponse|null} [validation] Response validation
         * @property {commands.IConfigurationResponse|null} [configuration] Response configuration
         * @property {commands.IStateResponse|null} [state] Response state
         */

        /**
         * Constructs a new Response.
         * @memberof commands
         * @classdesc Represents a Response.
         * @implements IResponse
         * @constructor
         * @param {commands.IResponse=} [properties] Properties to set
         */
        function Response(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Response callbackId.
         * @member {string} callbackId
         * @memberof commands.Response
         * @instance
         */
        Response.prototype.callbackId = "";

        /**
         * Response error.
         * @member {commands.IErrorResponse|null|undefined} error
         * @memberof commands.Response
         * @instance
         */
        Response.prototype.error = null;

        /**
         * Response counter.
         * @member {commands.ICounterResponse|null|undefined} counter
         * @memberof commands.Response
         * @instance
         */
        Response.prototype.counter = null;

        /**
         * Response user.
         * @member {commands.IUserResponse|null|undefined} user
         * @memberof commands.Response
         * @instance
         */
        Response.prototype.user = null;

        /**
         * Response users.
         * @member {commands.IUsersResponse|null|undefined} users
         * @memberof commands.Response
         * @instance
         */
        Response.prototype.users = null;

        /**
         * Response success.
         * @member {commands.ISuccessResponse|null|undefined} success
         * @memberof commands.Response
         * @instance
         */
        Response.prototype.success = null;

        /**
         * Response sum.
         * @member {commands.ISumResponse|null|undefined} sum
         * @memberof commands.Response
         * @instance
         */
        Response.prototype.sum = null;

        /**
         * Response validation.
         * @member {commands.IValidationResponse|null|undefined} validation
         * @memberof commands.Response
         * @instance
         */
        Response.prototype.validation = null;

        /**
         * Response configuration.
         * @member {commands.IConfigurationResponse|null|undefined} configuration
         * @memberof commands.Response
         * @instance
         */
        Response.prototype.configuration = null;

        /**
         * Response state.
         * @member {commands.IStateResponse|null|undefined} state
         * @memberof commands.Response
         * @instance
         */
        Response.prototype.state = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * Response result.
         * @member {"error"|"counter"|"user"|"users"|"success"|"sum"|"validation"|"configuration"|"state"|undefined} result
         * @memberof commands.Response
         * @instance
         */
        Object.defineProperty(Response.prototype, "result", {
            get: $util.oneOfGetter($oneOfFields = ["error", "counter", "user", "users", "success", "sum", "validation", "configuration", "state"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Response instance using the specified properties.
         * @function create
         * @memberof commands.Response
         * @static
         * @param {commands.IResponse=} [properties] Properties to set
         * @returns {commands.Response} Response instance
         */
        Response.create = function create(properties) {
            return new Response(properties);
        };

        /**
         * Encodes the specified Response message. Does not implicitly {@link commands.Response.verify|verify} messages.
         * @function encode
         * @memberof commands.Response
         * @static
         * @param {commands.IResponse} message Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Response.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.callbackId != null && Object.hasOwnProperty.call(message, "callbackId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.callbackId);
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.commands.ErrorResponse.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.counter != null && Object.hasOwnProperty.call(message, "counter"))
                $root.commands.CounterResponse.encode(message.counter, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.user != null && Object.hasOwnProperty.call(message, "user"))
                $root.commands.UserResponse.encode(message.user, writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
            if (message.users != null && Object.hasOwnProperty.call(message, "users"))
                $root.commands.UsersResponse.encode(message.users, writer.uint32(/* id 21, wireType 2 =*/170).fork()).ldelim();
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                $root.commands.SuccessResponse.encode(message.success, writer.uint32(/* id 22, wireType 2 =*/178).fork()).ldelim();
            if (message.sum != null && Object.hasOwnProperty.call(message, "sum"))
                $root.commands.SumResponse.encode(message.sum, writer.uint32(/* id 30, wireType 2 =*/242).fork()).ldelim();
            if (message.validation != null && Object.hasOwnProperty.call(message, "validation"))
                $root.commands.ValidationResponse.encode(message.validation, writer.uint32(/* id 40, wireType 2 =*/322).fork()).ldelim();
            if (message.configuration != null && Object.hasOwnProperty.call(message, "configuration"))
                $root.commands.ConfigurationResponse.encode(message.configuration, writer.uint32(/* id 60, wireType 2 =*/482).fork()).ldelim();
            if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                $root.commands.StateResponse.encode(message.state, writer.uint32(/* id 70, wireType 2 =*/562).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Response message, length delimited. Does not implicitly {@link commands.Response.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.Response
         * @static
         * @param {commands.IResponse} message Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Response.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Response message from the specified reader or buffer.
         * @function decode
         * @memberof commands.Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.Response} Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Response.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.Response();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.callbackId = reader.string();
                        break;
                    }
                case 2: {
                        message.error = $root.commands.ErrorResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 10: {
                        message.counter = $root.commands.CounterResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 20: {
                        message.user = $root.commands.UserResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 21: {
                        message.users = $root.commands.UsersResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 22: {
                        message.success = $root.commands.SuccessResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 30: {
                        message.sum = $root.commands.SumResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 40: {
                        message.validation = $root.commands.ValidationResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 60: {
                        message.configuration = $root.commands.ConfigurationResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 70: {
                        message.state = $root.commands.StateResponse.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Response message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.Response} Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Response.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Response message.
         * @function verify
         * @memberof commands.Response
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Response.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.callbackId != null && message.hasOwnProperty("callbackId"))
                if (!$util.isString(message.callbackId))
                    return "callbackId: string expected";
            if (message.error != null && message.hasOwnProperty("error")) {
                properties.result = 1;
                {
                    let error = $root.commands.ErrorResponse.verify(message.error);
                    if (error)
                        return "error." + error;
                }
            }
            if (message.counter != null && message.hasOwnProperty("counter")) {
                if (properties.result === 1)
                    return "result: multiple values";
                properties.result = 1;
                {
                    let error = $root.commands.CounterResponse.verify(message.counter);
                    if (error)
                        return "counter." + error;
                }
            }
            if (message.user != null && message.hasOwnProperty("user")) {
                if (properties.result === 1)
                    return "result: multiple values";
                properties.result = 1;
                {
                    let error = $root.commands.UserResponse.verify(message.user);
                    if (error)
                        return "user." + error;
                }
            }
            if (message.users != null && message.hasOwnProperty("users")) {
                if (properties.result === 1)
                    return "result: multiple values";
                properties.result = 1;
                {
                    let error = $root.commands.UsersResponse.verify(message.users);
                    if (error)
                        return "users." + error;
                }
            }
            if (message.success != null && message.hasOwnProperty("success")) {
                if (properties.result === 1)
                    return "result: multiple values";
                properties.result = 1;
                {
                    let error = $root.commands.SuccessResponse.verify(message.success);
                    if (error)
                        return "success." + error;
                }
            }
            if (message.sum != null && message.hasOwnProperty("sum")) {
                if (properties.result === 1)
                    return "result: multiple values";
                properties.result = 1;
                {
                    let error = $root.commands.SumResponse.verify(message.sum);
                    if (error)
                        return "sum." + error;
                }
            }
            if (message.validation != null && message.hasOwnProperty("validation")) {
                if (properties.result === 1)
                    return "result: multiple values";
                properties.result = 1;
                {
                    let error = $root.commands.ValidationResponse.verify(message.validation);
                    if (error)
                        return "validation." + error;
                }
            }
            if (message.configuration != null && message.hasOwnProperty("configuration")) {
                if (properties.result === 1)
                    return "result: multiple values";
                properties.result = 1;
                {
                    let error = $root.commands.ConfigurationResponse.verify(message.configuration);
                    if (error)
                        return "configuration." + error;
                }
            }
            if (message.state != null && message.hasOwnProperty("state")) {
                if (properties.result === 1)
                    return "result: multiple values";
                properties.result = 1;
                {
                    let error = $root.commands.StateResponse.verify(message.state);
                    if (error)
                        return "state." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Response message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.Response
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.Response} Response
         */
        Response.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.Response)
                return object;
            let message = new $root.commands.Response();
            if (object.callbackId != null)
                message.callbackId = String(object.callbackId);
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".commands.Response.error: object expected");
                message.error = $root.commands.ErrorResponse.fromObject(object.error);
            }
            if (object.counter != null) {
                if (typeof object.counter !== "object")
                    throw TypeError(".commands.Response.counter: object expected");
                message.counter = $root.commands.CounterResponse.fromObject(object.counter);
            }
            if (object.user != null) {
                if (typeof object.user !== "object")
                    throw TypeError(".commands.Response.user: object expected");
                message.user = $root.commands.UserResponse.fromObject(object.user);
            }
            if (object.users != null) {
                if (typeof object.users !== "object")
                    throw TypeError(".commands.Response.users: object expected");
                message.users = $root.commands.UsersResponse.fromObject(object.users);
            }
            if (object.success != null) {
                if (typeof object.success !== "object")
                    throw TypeError(".commands.Response.success: object expected");
                message.success = $root.commands.SuccessResponse.fromObject(object.success);
            }
            if (object.sum != null) {
                if (typeof object.sum !== "object")
                    throw TypeError(".commands.Response.sum: object expected");
                message.sum = $root.commands.SumResponse.fromObject(object.sum);
            }
            if (object.validation != null) {
                if (typeof object.validation !== "object")
                    throw TypeError(".commands.Response.validation: object expected");
                message.validation = $root.commands.ValidationResponse.fromObject(object.validation);
            }
            if (object.configuration != null) {
                if (typeof object.configuration !== "object")
                    throw TypeError(".commands.Response.configuration: object expected");
                message.configuration = $root.commands.ConfigurationResponse.fromObject(object.configuration);
            }
            if (object.state != null) {
                if (typeof object.state !== "object")
                    throw TypeError(".commands.Response.state: object expected");
                message.state = $root.commands.StateResponse.fromObject(object.state);
            }
            return message;
        };

        /**
         * Creates a plain object from a Response message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.Response
         * @static
         * @param {commands.Response} message Response
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Response.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.callbackId = "";
            if (message.callbackId != null && message.hasOwnProperty("callbackId"))
                object.callbackId = message.callbackId;
            if (message.error != null && message.hasOwnProperty("error")) {
                object.error = $root.commands.ErrorResponse.toObject(message.error, options);
                if (options.oneofs)
                    object.result = "error";
            }
            if (message.counter != null && message.hasOwnProperty("counter")) {
                object.counter = $root.commands.CounterResponse.toObject(message.counter, options);
                if (options.oneofs)
                    object.result = "counter";
            }
            if (message.user != null && message.hasOwnProperty("user")) {
                object.user = $root.commands.UserResponse.toObject(message.user, options);
                if (options.oneofs)
                    object.result = "user";
            }
            if (message.users != null && message.hasOwnProperty("users")) {
                object.users = $root.commands.UsersResponse.toObject(message.users, options);
                if (options.oneofs)
                    object.result = "users";
            }
            if (message.success != null && message.hasOwnProperty("success")) {
                object.success = $root.commands.SuccessResponse.toObject(message.success, options);
                if (options.oneofs)
                    object.result = "success";
            }
            if (message.sum != null && message.hasOwnProperty("sum")) {
                object.sum = $root.commands.SumResponse.toObject(message.sum, options);
                if (options.oneofs)
                    object.result = "sum";
            }
            if (message.validation != null && message.hasOwnProperty("validation")) {
                object.validation = $root.commands.ValidationResponse.toObject(message.validation, options);
                if (options.oneofs)
                    object.result = "validation";
            }
            if (message.configuration != null && message.hasOwnProperty("configuration")) {
                object.configuration = $root.commands.ConfigurationResponse.toObject(message.configuration, options);
                if (options.oneofs)
                    object.result = "configuration";
            }
            if (message.state != null && message.hasOwnProperty("state")) {
                object.state = $root.commands.StateResponse.toObject(message.state, options);
                if (options.oneofs)
                    object.result = "state";
            }
            return object;
        };

        /**
         * Converts this Response to JSON.
         * @function toJSON
         * @memberof commands.Response
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Response.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Response
         * @function getTypeUrl
         * @memberof commands.Response
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.Response";
        };

        return Response;
    })();

    commands.IncrementCommand = (function() {

        /**
         * Properties of an IncrementCommand.
         * @memberof commands
         * @interface IIncrementCommand
         */

        /**
         * Constructs a new IncrementCommand.
         * @memberof commands
         * @classdesc Represents an IncrementCommand.
         * @implements IIncrementCommand
         * @constructor
         * @param {commands.IIncrementCommand=} [properties] Properties to set
         */
        function IncrementCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new IncrementCommand instance using the specified properties.
         * @function create
         * @memberof commands.IncrementCommand
         * @static
         * @param {commands.IIncrementCommand=} [properties] Properties to set
         * @returns {commands.IncrementCommand} IncrementCommand instance
         */
        IncrementCommand.create = function create(properties) {
            return new IncrementCommand(properties);
        };

        /**
         * Encodes the specified IncrementCommand message. Does not implicitly {@link commands.IncrementCommand.verify|verify} messages.
         * @function encode
         * @memberof commands.IncrementCommand
         * @static
         * @param {commands.IIncrementCommand} message IncrementCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IncrementCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified IncrementCommand message, length delimited. Does not implicitly {@link commands.IncrementCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.IncrementCommand
         * @static
         * @param {commands.IIncrementCommand} message IncrementCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IncrementCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an IncrementCommand message from the specified reader or buffer.
         * @function decode
         * @memberof commands.IncrementCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.IncrementCommand} IncrementCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IncrementCommand.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.IncrementCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an IncrementCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.IncrementCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.IncrementCommand} IncrementCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IncrementCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an IncrementCommand message.
         * @function verify
         * @memberof commands.IncrementCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        IncrementCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates an IncrementCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.IncrementCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.IncrementCommand} IncrementCommand
         */
        IncrementCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.IncrementCommand)
                return object;
            return new $root.commands.IncrementCommand();
        };

        /**
         * Creates a plain object from an IncrementCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.IncrementCommand
         * @static
         * @param {commands.IncrementCommand} message IncrementCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        IncrementCommand.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this IncrementCommand to JSON.
         * @function toJSON
         * @memberof commands.IncrementCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        IncrementCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for IncrementCommand
         * @function getTypeUrl
         * @memberof commands.IncrementCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        IncrementCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.IncrementCommand";
        };

        return IncrementCommand;
    })();

    commands.DecrementCommand = (function() {

        /**
         * Properties of a DecrementCommand.
         * @memberof commands
         * @interface IDecrementCommand
         */

        /**
         * Constructs a new DecrementCommand.
         * @memberof commands
         * @classdesc Represents a DecrementCommand.
         * @implements IDecrementCommand
         * @constructor
         * @param {commands.IDecrementCommand=} [properties] Properties to set
         */
        function DecrementCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new DecrementCommand instance using the specified properties.
         * @function create
         * @memberof commands.DecrementCommand
         * @static
         * @param {commands.IDecrementCommand=} [properties] Properties to set
         * @returns {commands.DecrementCommand} DecrementCommand instance
         */
        DecrementCommand.create = function create(properties) {
            return new DecrementCommand(properties);
        };

        /**
         * Encodes the specified DecrementCommand message. Does not implicitly {@link commands.DecrementCommand.verify|verify} messages.
         * @function encode
         * @memberof commands.DecrementCommand
         * @static
         * @param {commands.IDecrementCommand} message DecrementCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DecrementCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified DecrementCommand message, length delimited. Does not implicitly {@link commands.DecrementCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.DecrementCommand
         * @static
         * @param {commands.IDecrementCommand} message DecrementCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DecrementCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DecrementCommand message from the specified reader or buffer.
         * @function decode
         * @memberof commands.DecrementCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.DecrementCommand} DecrementCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DecrementCommand.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.DecrementCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DecrementCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.DecrementCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.DecrementCommand} DecrementCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DecrementCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DecrementCommand message.
         * @function verify
         * @memberof commands.DecrementCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DecrementCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a DecrementCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.DecrementCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.DecrementCommand} DecrementCommand
         */
        DecrementCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.DecrementCommand)
                return object;
            return new $root.commands.DecrementCommand();
        };

        /**
         * Creates a plain object from a DecrementCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.DecrementCommand
         * @static
         * @param {commands.DecrementCommand} message DecrementCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DecrementCommand.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this DecrementCommand to JSON.
         * @function toJSON
         * @memberof commands.DecrementCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DecrementCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DecrementCommand
         * @function getTypeUrl
         * @memberof commands.DecrementCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DecrementCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.DecrementCommand";
        };

        return DecrementCommand;
    })();

    commands.SetCounterCommand = (function() {

        /**
         * Properties of a SetCounterCommand.
         * @memberof commands
         * @interface ISetCounterCommand
         * @property {number|null} [value] SetCounterCommand value
         */

        /**
         * Constructs a new SetCounterCommand.
         * @memberof commands
         * @classdesc Represents a SetCounterCommand.
         * @implements ISetCounterCommand
         * @constructor
         * @param {commands.ISetCounterCommand=} [properties] Properties to set
         */
        function SetCounterCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SetCounterCommand value.
         * @member {number} value
         * @memberof commands.SetCounterCommand
         * @instance
         */
        SetCounterCommand.prototype.value = 0;

        /**
         * Creates a new SetCounterCommand instance using the specified properties.
         * @function create
         * @memberof commands.SetCounterCommand
         * @static
         * @param {commands.ISetCounterCommand=} [properties] Properties to set
         * @returns {commands.SetCounterCommand} SetCounterCommand instance
         */
        SetCounterCommand.create = function create(properties) {
            return new SetCounterCommand(properties);
        };

        /**
         * Encodes the specified SetCounterCommand message. Does not implicitly {@link commands.SetCounterCommand.verify|verify} messages.
         * @function encode
         * @memberof commands.SetCounterCommand
         * @static
         * @param {commands.ISetCounterCommand} message SetCounterCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SetCounterCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.value);
            return writer;
        };

        /**
         * Encodes the specified SetCounterCommand message, length delimited. Does not implicitly {@link commands.SetCounterCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.SetCounterCommand
         * @static
         * @param {commands.ISetCounterCommand} message SetCounterCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SetCounterCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SetCounterCommand message from the specified reader or buffer.
         * @function decode
         * @memberof commands.SetCounterCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.SetCounterCommand} SetCounterCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SetCounterCommand.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.SetCounterCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.value = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SetCounterCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.SetCounterCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.SetCounterCommand} SetCounterCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SetCounterCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SetCounterCommand message.
         * @function verify
         * @memberof commands.SetCounterCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SetCounterCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!$util.isInteger(message.value))
                    return "value: integer expected";
            return null;
        };

        /**
         * Creates a SetCounterCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.SetCounterCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.SetCounterCommand} SetCounterCommand
         */
        SetCounterCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.SetCounterCommand)
                return object;
            let message = new $root.commands.SetCounterCommand();
            if (object.value != null)
                message.value = object.value | 0;
            return message;
        };

        /**
         * Creates a plain object from a SetCounterCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.SetCounterCommand
         * @static
         * @param {commands.SetCounterCommand} message SetCounterCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SetCounterCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.value = 0;
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this SetCounterCommand to JSON.
         * @function toJSON
         * @memberof commands.SetCounterCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SetCounterCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SetCounterCommand
         * @function getTypeUrl
         * @memberof commands.SetCounterCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SetCounterCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.SetCounterCommand";
        };

        return SetCounterCommand;
    })();

    commands.GetCounterCommand = (function() {

        /**
         * Properties of a GetCounterCommand.
         * @memberof commands
         * @interface IGetCounterCommand
         */

        /**
         * Constructs a new GetCounterCommand.
         * @memberof commands
         * @classdesc Represents a GetCounterCommand.
         * @implements IGetCounterCommand
         * @constructor
         * @param {commands.IGetCounterCommand=} [properties] Properties to set
         */
        function GetCounterCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new GetCounterCommand instance using the specified properties.
         * @function create
         * @memberof commands.GetCounterCommand
         * @static
         * @param {commands.IGetCounterCommand=} [properties] Properties to set
         * @returns {commands.GetCounterCommand} GetCounterCommand instance
         */
        GetCounterCommand.create = function create(properties) {
            return new GetCounterCommand(properties);
        };

        /**
         * Encodes the specified GetCounterCommand message. Does not implicitly {@link commands.GetCounterCommand.verify|verify} messages.
         * @function encode
         * @memberof commands.GetCounterCommand
         * @static
         * @param {commands.IGetCounterCommand} message GetCounterCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetCounterCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified GetCounterCommand message, length delimited. Does not implicitly {@link commands.GetCounterCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.GetCounterCommand
         * @static
         * @param {commands.IGetCounterCommand} message GetCounterCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetCounterCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetCounterCommand message from the specified reader or buffer.
         * @function decode
         * @memberof commands.GetCounterCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.GetCounterCommand} GetCounterCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetCounterCommand.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.GetCounterCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetCounterCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.GetCounterCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.GetCounterCommand} GetCounterCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetCounterCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetCounterCommand message.
         * @function verify
         * @memberof commands.GetCounterCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetCounterCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a GetCounterCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.GetCounterCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.GetCounterCommand} GetCounterCommand
         */
        GetCounterCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.GetCounterCommand)
                return object;
            return new $root.commands.GetCounterCommand();
        };

        /**
         * Creates a plain object from a GetCounterCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.GetCounterCommand
         * @static
         * @param {commands.GetCounterCommand} message GetCounterCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetCounterCommand.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this GetCounterCommand to JSON.
         * @function toJSON
         * @memberof commands.GetCounterCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetCounterCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetCounterCommand
         * @function getTypeUrl
         * @memberof commands.GetCounterCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetCounterCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.GetCounterCommand";
        };

        return GetCounterCommand;
    })();

    commands.AddUserCommand = (function() {

        /**
         * Properties of an AddUserCommand.
         * @memberof commands
         * @interface IAddUserCommand
         * @property {string|null} [name] AddUserCommand name
         * @property {string|null} [email] AddUserCommand email
         */

        /**
         * Constructs a new AddUserCommand.
         * @memberof commands
         * @classdesc Represents an AddUserCommand.
         * @implements IAddUserCommand
         * @constructor
         * @param {commands.IAddUserCommand=} [properties] Properties to set
         */
        function AddUserCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AddUserCommand name.
         * @member {string} name
         * @memberof commands.AddUserCommand
         * @instance
         */
        AddUserCommand.prototype.name = "";

        /**
         * AddUserCommand email.
         * @member {string} email
         * @memberof commands.AddUserCommand
         * @instance
         */
        AddUserCommand.prototype.email = "";

        /**
         * Creates a new AddUserCommand instance using the specified properties.
         * @function create
         * @memberof commands.AddUserCommand
         * @static
         * @param {commands.IAddUserCommand=} [properties] Properties to set
         * @returns {commands.AddUserCommand} AddUserCommand instance
         */
        AddUserCommand.create = function create(properties) {
            return new AddUserCommand(properties);
        };

        /**
         * Encodes the specified AddUserCommand message. Does not implicitly {@link commands.AddUserCommand.verify|verify} messages.
         * @function encode
         * @memberof commands.AddUserCommand
         * @static
         * @param {commands.IAddUserCommand} message AddUserCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddUserCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.email);
            return writer;
        };

        /**
         * Encodes the specified AddUserCommand message, length delimited. Does not implicitly {@link commands.AddUserCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.AddUserCommand
         * @static
         * @param {commands.IAddUserCommand} message AddUserCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddUserCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AddUserCommand message from the specified reader or buffer.
         * @function decode
         * @memberof commands.AddUserCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.AddUserCommand} AddUserCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddUserCommand.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.AddUserCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.name = reader.string();
                        break;
                    }
                case 2: {
                        message.email = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AddUserCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.AddUserCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.AddUserCommand} AddUserCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddUserCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AddUserCommand message.
         * @function verify
         * @memberof commands.AddUserCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AddUserCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.email != null && message.hasOwnProperty("email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            return null;
        };

        /**
         * Creates an AddUserCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.AddUserCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.AddUserCommand} AddUserCommand
         */
        AddUserCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.AddUserCommand)
                return object;
            let message = new $root.commands.AddUserCommand();
            if (object.name != null)
                message.name = String(object.name);
            if (object.email != null)
                message.email = String(object.email);
            return message;
        };

        /**
         * Creates a plain object from an AddUserCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.AddUserCommand
         * @static
         * @param {commands.AddUserCommand} message AddUserCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AddUserCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.name = "";
                object.email = "";
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.email != null && message.hasOwnProperty("email"))
                object.email = message.email;
            return object;
        };

        /**
         * Converts this AddUserCommand to JSON.
         * @function toJSON
         * @memberof commands.AddUserCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AddUserCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AddUserCommand
         * @function getTypeUrl
         * @memberof commands.AddUserCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AddUserCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.AddUserCommand";
        };

        return AddUserCommand;
    })();

    commands.RemoveUserCommand = (function() {

        /**
         * Properties of a RemoveUserCommand.
         * @memberof commands
         * @interface IRemoveUserCommand
         * @property {string|null} [id] RemoveUserCommand id
         */

        /**
         * Constructs a new RemoveUserCommand.
         * @memberof commands
         * @classdesc Represents a RemoveUserCommand.
         * @implements IRemoveUserCommand
         * @constructor
         * @param {commands.IRemoveUserCommand=} [properties] Properties to set
         */
        function RemoveUserCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RemoveUserCommand id.
         * @member {string} id
         * @memberof commands.RemoveUserCommand
         * @instance
         */
        RemoveUserCommand.prototype.id = "";

        /**
         * Creates a new RemoveUserCommand instance using the specified properties.
         * @function create
         * @memberof commands.RemoveUserCommand
         * @static
         * @param {commands.IRemoveUserCommand=} [properties] Properties to set
         * @returns {commands.RemoveUserCommand} RemoveUserCommand instance
         */
        RemoveUserCommand.create = function create(properties) {
            return new RemoveUserCommand(properties);
        };

        /**
         * Encodes the specified RemoveUserCommand message. Does not implicitly {@link commands.RemoveUserCommand.verify|verify} messages.
         * @function encode
         * @memberof commands.RemoveUserCommand
         * @static
         * @param {commands.IRemoveUserCommand} message RemoveUserCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoveUserCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            return writer;
        };

        /**
         * Encodes the specified RemoveUserCommand message, length delimited. Does not implicitly {@link commands.RemoveUserCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.RemoveUserCommand
         * @static
         * @param {commands.IRemoveUserCommand} message RemoveUserCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoveUserCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RemoveUserCommand message from the specified reader or buffer.
         * @function decode
         * @memberof commands.RemoveUserCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.RemoveUserCommand} RemoveUserCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoveUserCommand.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.RemoveUserCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RemoveUserCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.RemoveUserCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.RemoveUserCommand} RemoveUserCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoveUserCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoveUserCommand message.
         * @function verify
         * @memberof commands.RemoveUserCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoveUserCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            return null;
        };

        /**
         * Creates a RemoveUserCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.RemoveUserCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.RemoveUserCommand} RemoveUserCommand
         */
        RemoveUserCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.RemoveUserCommand)
                return object;
            let message = new $root.commands.RemoveUserCommand();
            if (object.id != null)
                message.id = String(object.id);
            return message;
        };

        /**
         * Creates a plain object from a RemoveUserCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.RemoveUserCommand
         * @static
         * @param {commands.RemoveUserCommand} message RemoveUserCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoveUserCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.id = "";
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this RemoveUserCommand to JSON.
         * @function toJSON
         * @memberof commands.RemoveUserCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoveUserCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RemoveUserCommand
         * @function getTypeUrl
         * @memberof commands.RemoveUserCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RemoveUserCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.RemoveUserCommand";
        };

        return RemoveUserCommand;
    })();

    commands.GetUsersCommand = (function() {

        /**
         * Properties of a GetUsersCommand.
         * @memberof commands
         * @interface IGetUsersCommand
         */

        /**
         * Constructs a new GetUsersCommand.
         * @memberof commands
         * @classdesc Represents a GetUsersCommand.
         * @implements IGetUsersCommand
         * @constructor
         * @param {commands.IGetUsersCommand=} [properties] Properties to set
         */
        function GetUsersCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new GetUsersCommand instance using the specified properties.
         * @function create
         * @memberof commands.GetUsersCommand
         * @static
         * @param {commands.IGetUsersCommand=} [properties] Properties to set
         * @returns {commands.GetUsersCommand} GetUsersCommand instance
         */
        GetUsersCommand.create = function create(properties) {
            return new GetUsersCommand(properties);
        };

        /**
         * Encodes the specified GetUsersCommand message. Does not implicitly {@link commands.GetUsersCommand.verify|verify} messages.
         * @function encode
         * @memberof commands.GetUsersCommand
         * @static
         * @param {commands.IGetUsersCommand} message GetUsersCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetUsersCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified GetUsersCommand message, length delimited. Does not implicitly {@link commands.GetUsersCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.GetUsersCommand
         * @static
         * @param {commands.IGetUsersCommand} message GetUsersCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetUsersCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetUsersCommand message from the specified reader or buffer.
         * @function decode
         * @memberof commands.GetUsersCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.GetUsersCommand} GetUsersCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetUsersCommand.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.GetUsersCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetUsersCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.GetUsersCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.GetUsersCommand} GetUsersCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetUsersCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetUsersCommand message.
         * @function verify
         * @memberof commands.GetUsersCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetUsersCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a GetUsersCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.GetUsersCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.GetUsersCommand} GetUsersCommand
         */
        GetUsersCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.GetUsersCommand)
                return object;
            return new $root.commands.GetUsersCommand();
        };

        /**
         * Creates a plain object from a GetUsersCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.GetUsersCommand
         * @static
         * @param {commands.GetUsersCommand} message GetUsersCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetUsersCommand.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this GetUsersCommand to JSON.
         * @function toJSON
         * @memberof commands.GetUsersCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetUsersCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetUsersCommand
         * @function getTypeUrl
         * @memberof commands.GetUsersCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetUsersCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.GetUsersCommand";
        };

        return GetUsersCommand;
    })();

    commands.CalculateSumCommand = (function() {

        /**
         * Properties of a CalculateSumCommand.
         * @memberof commands
         * @interface ICalculateSumCommand
         * @property {number|null} [a] CalculateSumCommand a
         * @property {number|null} [b] CalculateSumCommand b
         */

        /**
         * Constructs a new CalculateSumCommand.
         * @memberof commands
         * @classdesc Represents a CalculateSumCommand.
         * @implements ICalculateSumCommand
         * @constructor
         * @param {commands.ICalculateSumCommand=} [properties] Properties to set
         */
        function CalculateSumCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CalculateSumCommand a.
         * @member {number} a
         * @memberof commands.CalculateSumCommand
         * @instance
         */
        CalculateSumCommand.prototype.a = 0;

        /**
         * CalculateSumCommand b.
         * @member {number} b
         * @memberof commands.CalculateSumCommand
         * @instance
         */
        CalculateSumCommand.prototype.b = 0;

        /**
         * Creates a new CalculateSumCommand instance using the specified properties.
         * @function create
         * @memberof commands.CalculateSumCommand
         * @static
         * @param {commands.ICalculateSumCommand=} [properties] Properties to set
         * @returns {commands.CalculateSumCommand} CalculateSumCommand instance
         */
        CalculateSumCommand.create = function create(properties) {
            return new CalculateSumCommand(properties);
        };

        /**
         * Encodes the specified CalculateSumCommand message. Does not implicitly {@link commands.CalculateSumCommand.verify|verify} messages.
         * @function encode
         * @memberof commands.CalculateSumCommand
         * @static
         * @param {commands.ICalculateSumCommand} message CalculateSumCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CalculateSumCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.a != null && Object.hasOwnProperty.call(message, "a"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.a);
            if (message.b != null && Object.hasOwnProperty.call(message, "b"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.b);
            return writer;
        };

        /**
         * Encodes the specified CalculateSumCommand message, length delimited. Does not implicitly {@link commands.CalculateSumCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.CalculateSumCommand
         * @static
         * @param {commands.ICalculateSumCommand} message CalculateSumCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CalculateSumCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CalculateSumCommand message from the specified reader or buffer.
         * @function decode
         * @memberof commands.CalculateSumCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.CalculateSumCommand} CalculateSumCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CalculateSumCommand.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.CalculateSumCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.a = reader.int32();
                        break;
                    }
                case 2: {
                        message.b = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CalculateSumCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.CalculateSumCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.CalculateSumCommand} CalculateSumCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CalculateSumCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CalculateSumCommand message.
         * @function verify
         * @memberof commands.CalculateSumCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CalculateSumCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.a != null && message.hasOwnProperty("a"))
                if (!$util.isInteger(message.a))
                    return "a: integer expected";
            if (message.b != null && message.hasOwnProperty("b"))
                if (!$util.isInteger(message.b))
                    return "b: integer expected";
            return null;
        };

        /**
         * Creates a CalculateSumCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.CalculateSumCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.CalculateSumCommand} CalculateSumCommand
         */
        CalculateSumCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.CalculateSumCommand)
                return object;
            let message = new $root.commands.CalculateSumCommand();
            if (object.a != null)
                message.a = object.a | 0;
            if (object.b != null)
                message.b = object.b | 0;
            return message;
        };

        /**
         * Creates a plain object from a CalculateSumCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.CalculateSumCommand
         * @static
         * @param {commands.CalculateSumCommand} message CalculateSumCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CalculateSumCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.a = 0;
                object.b = 0;
            }
            if (message.a != null && message.hasOwnProperty("a"))
                object.a = message.a;
            if (message.b != null && message.hasOwnProperty("b"))
                object.b = message.b;
            return object;
        };

        /**
         * Converts this CalculateSumCommand to JSON.
         * @function toJSON
         * @memberof commands.CalculateSumCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CalculateSumCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for CalculateSumCommand
         * @function getTypeUrl
         * @memberof commands.CalculateSumCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        CalculateSumCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.CalculateSumCommand";
        };

        return CalculateSumCommand;
    })();

    commands.ValidateInputCommand = (function() {

        /**
         * Properties of a ValidateInputCommand.
         * @memberof commands
         * @interface IValidateInputCommand
         * @property {string|null} [email] ValidateInputCommand email
         * @property {string|null} [password] ValidateInputCommand password
         */

        /**
         * Constructs a new ValidateInputCommand.
         * @memberof commands
         * @classdesc Represents a ValidateInputCommand.
         * @implements IValidateInputCommand
         * @constructor
         * @param {commands.IValidateInputCommand=} [properties] Properties to set
         */
        function ValidateInputCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ValidateInputCommand email.
         * @member {string} email
         * @memberof commands.ValidateInputCommand
         * @instance
         */
        ValidateInputCommand.prototype.email = "";

        /**
         * ValidateInputCommand password.
         * @member {string} password
         * @memberof commands.ValidateInputCommand
         * @instance
         */
        ValidateInputCommand.prototype.password = "";

        /**
         * Creates a new ValidateInputCommand instance using the specified properties.
         * @function create
         * @memberof commands.ValidateInputCommand
         * @static
         * @param {commands.IValidateInputCommand=} [properties] Properties to set
         * @returns {commands.ValidateInputCommand} ValidateInputCommand instance
         */
        ValidateInputCommand.create = function create(properties) {
            return new ValidateInputCommand(properties);
        };

        /**
         * Encodes the specified ValidateInputCommand message. Does not implicitly {@link commands.ValidateInputCommand.verify|verify} messages.
         * @function encode
         * @memberof commands.ValidateInputCommand
         * @static
         * @param {commands.IValidateInputCommand} message ValidateInputCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidateInputCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.email);
            if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.password);
            return writer;
        };

        /**
         * Encodes the specified ValidateInputCommand message, length delimited. Does not implicitly {@link commands.ValidateInputCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.ValidateInputCommand
         * @static
         * @param {commands.IValidateInputCommand} message ValidateInputCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidateInputCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ValidateInputCommand message from the specified reader or buffer.
         * @function decode
         * @memberof commands.ValidateInputCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.ValidateInputCommand} ValidateInputCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidateInputCommand.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.ValidateInputCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.email = reader.string();
                        break;
                    }
                case 2: {
                        message.password = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ValidateInputCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.ValidateInputCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.ValidateInputCommand} ValidateInputCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidateInputCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ValidateInputCommand message.
         * @function verify
         * @memberof commands.ValidateInputCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ValidateInputCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.email != null && message.hasOwnProperty("email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            if (message.password != null && message.hasOwnProperty("password"))
                if (!$util.isString(message.password))
                    return "password: string expected";
            return null;
        };

        /**
         * Creates a ValidateInputCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.ValidateInputCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.ValidateInputCommand} ValidateInputCommand
         */
        ValidateInputCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.ValidateInputCommand)
                return object;
            let message = new $root.commands.ValidateInputCommand();
            if (object.email != null)
                message.email = String(object.email);
            if (object.password != null)
                message.password = String(object.password);
            return message;
        };

        /**
         * Creates a plain object from a ValidateInputCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.ValidateInputCommand
         * @static
         * @param {commands.ValidateInputCommand} message ValidateInputCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ValidateInputCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.email = "";
                object.password = "";
            }
            if (message.email != null && message.hasOwnProperty("email"))
                object.email = message.email;
            if (message.password != null && message.hasOwnProperty("password"))
                object.password = message.password;
            return object;
        };

        /**
         * Converts this ValidateInputCommand to JSON.
         * @function toJSON
         * @memberof commands.ValidateInputCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ValidateInputCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ValidateInputCommand
         * @function getTypeUrl
         * @memberof commands.ValidateInputCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ValidateInputCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.ValidateInputCommand";
        };

        return ValidateInputCommand;
    })();

    commands.FetchUserDataCommand = (function() {

        /**
         * Properties of a FetchUserDataCommand.
         * @memberof commands
         * @interface IFetchUserDataCommand
         * @property {string|null} [userId] FetchUserDataCommand userId
         */

        /**
         * Constructs a new FetchUserDataCommand.
         * @memberof commands
         * @classdesc Represents a FetchUserDataCommand.
         * @implements IFetchUserDataCommand
         * @constructor
         * @param {commands.IFetchUserDataCommand=} [properties] Properties to set
         */
        function FetchUserDataCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FetchUserDataCommand userId.
         * @member {string} userId
         * @memberof commands.FetchUserDataCommand
         * @instance
         */
        FetchUserDataCommand.prototype.userId = "";

        /**
         * Creates a new FetchUserDataCommand instance using the specified properties.
         * @function create
         * @memberof commands.FetchUserDataCommand
         * @static
         * @param {commands.IFetchUserDataCommand=} [properties] Properties to set
         * @returns {commands.FetchUserDataCommand} FetchUserDataCommand instance
         */
        FetchUserDataCommand.create = function create(properties) {
            return new FetchUserDataCommand(properties);
        };

        /**
         * Encodes the specified FetchUserDataCommand message. Does not implicitly {@link commands.FetchUserDataCommand.verify|verify} messages.
         * @function encode
         * @memberof commands.FetchUserDataCommand
         * @static
         * @param {commands.IFetchUserDataCommand} message FetchUserDataCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FetchUserDataCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.userId);
            return writer;
        };

        /**
         * Encodes the specified FetchUserDataCommand message, length delimited. Does not implicitly {@link commands.FetchUserDataCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.FetchUserDataCommand
         * @static
         * @param {commands.IFetchUserDataCommand} message FetchUserDataCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FetchUserDataCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FetchUserDataCommand message from the specified reader or buffer.
         * @function decode
         * @memberof commands.FetchUserDataCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.FetchUserDataCommand} FetchUserDataCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FetchUserDataCommand.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.FetchUserDataCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.userId = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a FetchUserDataCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.FetchUserDataCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.FetchUserDataCommand} FetchUserDataCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FetchUserDataCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FetchUserDataCommand message.
         * @function verify
         * @memberof commands.FetchUserDataCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FetchUserDataCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            return null;
        };

        /**
         * Creates a FetchUserDataCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.FetchUserDataCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.FetchUserDataCommand} FetchUserDataCommand
         */
        FetchUserDataCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.FetchUserDataCommand)
                return object;
            let message = new $root.commands.FetchUserDataCommand();
            if (object.userId != null)
                message.userId = String(object.userId);
            return message;
        };

        /**
         * Creates a plain object from a FetchUserDataCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.FetchUserDataCommand
         * @static
         * @param {commands.FetchUserDataCommand} message FetchUserDataCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FetchUserDataCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.userId = "";
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            return object;
        };

        /**
         * Converts this FetchUserDataCommand to JSON.
         * @function toJSON
         * @memberof commands.FetchUserDataCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FetchUserDataCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for FetchUserDataCommand
         * @function getTypeUrl
         * @memberof commands.FetchUserDataCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        FetchUserDataCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.FetchUserDataCommand";
        };

        return FetchUserDataCommand;
    })();

    commands.GetConfigurationCommand = (function() {

        /**
         * Properties of a GetConfigurationCommand.
         * @memberof commands
         * @interface IGetConfigurationCommand
         */

        /**
         * Constructs a new GetConfigurationCommand.
         * @memberof commands
         * @classdesc Represents a GetConfigurationCommand.
         * @implements IGetConfigurationCommand
         * @constructor
         * @param {commands.IGetConfigurationCommand=} [properties] Properties to set
         */
        function GetConfigurationCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new GetConfigurationCommand instance using the specified properties.
         * @function create
         * @memberof commands.GetConfigurationCommand
         * @static
         * @param {commands.IGetConfigurationCommand=} [properties] Properties to set
         * @returns {commands.GetConfigurationCommand} GetConfigurationCommand instance
         */
        GetConfigurationCommand.create = function create(properties) {
            return new GetConfigurationCommand(properties);
        };

        /**
         * Encodes the specified GetConfigurationCommand message. Does not implicitly {@link commands.GetConfigurationCommand.verify|verify} messages.
         * @function encode
         * @memberof commands.GetConfigurationCommand
         * @static
         * @param {commands.IGetConfigurationCommand} message GetConfigurationCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetConfigurationCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified GetConfigurationCommand message, length delimited. Does not implicitly {@link commands.GetConfigurationCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.GetConfigurationCommand
         * @static
         * @param {commands.IGetConfigurationCommand} message GetConfigurationCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetConfigurationCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetConfigurationCommand message from the specified reader or buffer.
         * @function decode
         * @memberof commands.GetConfigurationCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.GetConfigurationCommand} GetConfigurationCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetConfigurationCommand.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.GetConfigurationCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetConfigurationCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.GetConfigurationCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.GetConfigurationCommand} GetConfigurationCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetConfigurationCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetConfigurationCommand message.
         * @function verify
         * @memberof commands.GetConfigurationCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetConfigurationCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a GetConfigurationCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.GetConfigurationCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.GetConfigurationCommand} GetConfigurationCommand
         */
        GetConfigurationCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.GetConfigurationCommand)
                return object;
            return new $root.commands.GetConfigurationCommand();
        };

        /**
         * Creates a plain object from a GetConfigurationCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.GetConfigurationCommand
         * @static
         * @param {commands.GetConfigurationCommand} message GetConfigurationCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetConfigurationCommand.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this GetConfigurationCommand to JSON.
         * @function toJSON
         * @memberof commands.GetConfigurationCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetConfigurationCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetConfigurationCommand
         * @function getTypeUrl
         * @memberof commands.GetConfigurationCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetConfigurationCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.GetConfigurationCommand";
        };

        return GetConfigurationCommand;
    })();

    commands.UpdateConfigurationCommand = (function() {

        /**
         * Properties of an UpdateConfigurationCommand.
         * @memberof commands
         * @interface IUpdateConfigurationCommand
         * @property {commands.IConfiguration|null} [config] UpdateConfigurationCommand config
         */

        /**
         * Constructs a new UpdateConfigurationCommand.
         * @memberof commands
         * @classdesc Represents an UpdateConfigurationCommand.
         * @implements IUpdateConfigurationCommand
         * @constructor
         * @param {commands.IUpdateConfigurationCommand=} [properties] Properties to set
         */
        function UpdateConfigurationCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpdateConfigurationCommand config.
         * @member {commands.IConfiguration|null|undefined} config
         * @memberof commands.UpdateConfigurationCommand
         * @instance
         */
        UpdateConfigurationCommand.prototype.config = null;

        /**
         * Creates a new UpdateConfigurationCommand instance using the specified properties.
         * @function create
         * @memberof commands.UpdateConfigurationCommand
         * @static
         * @param {commands.IUpdateConfigurationCommand=} [properties] Properties to set
         * @returns {commands.UpdateConfigurationCommand} UpdateConfigurationCommand instance
         */
        UpdateConfigurationCommand.create = function create(properties) {
            return new UpdateConfigurationCommand(properties);
        };

        /**
         * Encodes the specified UpdateConfigurationCommand message. Does not implicitly {@link commands.UpdateConfigurationCommand.verify|verify} messages.
         * @function encode
         * @memberof commands.UpdateConfigurationCommand
         * @static
         * @param {commands.IUpdateConfigurationCommand} message UpdateConfigurationCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdateConfigurationCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                $root.commands.Configuration.encode(message.config, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UpdateConfigurationCommand message, length delimited. Does not implicitly {@link commands.UpdateConfigurationCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.UpdateConfigurationCommand
         * @static
         * @param {commands.IUpdateConfigurationCommand} message UpdateConfigurationCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdateConfigurationCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UpdateConfigurationCommand message from the specified reader or buffer.
         * @function decode
         * @memberof commands.UpdateConfigurationCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.UpdateConfigurationCommand} UpdateConfigurationCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdateConfigurationCommand.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.UpdateConfigurationCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.config = $root.commands.Configuration.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UpdateConfigurationCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.UpdateConfigurationCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.UpdateConfigurationCommand} UpdateConfigurationCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdateConfigurationCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UpdateConfigurationCommand message.
         * @function verify
         * @memberof commands.UpdateConfigurationCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UpdateConfigurationCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.config != null && message.hasOwnProperty("config")) {
                let error = $root.commands.Configuration.verify(message.config);
                if (error)
                    return "config." + error;
            }
            return null;
        };

        /**
         * Creates an UpdateConfigurationCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.UpdateConfigurationCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.UpdateConfigurationCommand} UpdateConfigurationCommand
         */
        UpdateConfigurationCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.UpdateConfigurationCommand)
                return object;
            let message = new $root.commands.UpdateConfigurationCommand();
            if (object.config != null) {
                if (typeof object.config !== "object")
                    throw TypeError(".commands.UpdateConfigurationCommand.config: object expected");
                message.config = $root.commands.Configuration.fromObject(object.config);
            }
            return message;
        };

        /**
         * Creates a plain object from an UpdateConfigurationCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.UpdateConfigurationCommand
         * @static
         * @param {commands.UpdateConfigurationCommand} message UpdateConfigurationCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpdateConfigurationCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.config = null;
            if (message.config != null && message.hasOwnProperty("config"))
                object.config = $root.commands.Configuration.toObject(message.config, options);
            return object;
        };

        /**
         * Converts this UpdateConfigurationCommand to JSON.
         * @function toJSON
         * @memberof commands.UpdateConfigurationCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpdateConfigurationCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UpdateConfigurationCommand
         * @function getTypeUrl
         * @memberof commands.UpdateConfigurationCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UpdateConfigurationCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.UpdateConfigurationCommand";
        };

        return UpdateConfigurationCommand;
    })();

    commands.GetStateCommand = (function() {

        /**
         * Properties of a GetStateCommand.
         * @memberof commands
         * @interface IGetStateCommand
         */

        /**
         * Constructs a new GetStateCommand.
         * @memberof commands
         * @classdesc Represents a GetStateCommand.
         * @implements IGetStateCommand
         * @constructor
         * @param {commands.IGetStateCommand=} [properties] Properties to set
         */
        function GetStateCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new GetStateCommand instance using the specified properties.
         * @function create
         * @memberof commands.GetStateCommand
         * @static
         * @param {commands.IGetStateCommand=} [properties] Properties to set
         * @returns {commands.GetStateCommand} GetStateCommand instance
         */
        GetStateCommand.create = function create(properties) {
            return new GetStateCommand(properties);
        };

        /**
         * Encodes the specified GetStateCommand message. Does not implicitly {@link commands.GetStateCommand.verify|verify} messages.
         * @function encode
         * @memberof commands.GetStateCommand
         * @static
         * @param {commands.IGetStateCommand} message GetStateCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetStateCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified GetStateCommand message, length delimited. Does not implicitly {@link commands.GetStateCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.GetStateCommand
         * @static
         * @param {commands.IGetStateCommand} message GetStateCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetStateCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetStateCommand message from the specified reader or buffer.
         * @function decode
         * @memberof commands.GetStateCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.GetStateCommand} GetStateCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetStateCommand.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.GetStateCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetStateCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.GetStateCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.GetStateCommand} GetStateCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetStateCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetStateCommand message.
         * @function verify
         * @memberof commands.GetStateCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetStateCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a GetStateCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.GetStateCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.GetStateCommand} GetStateCommand
         */
        GetStateCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.GetStateCommand)
                return object;
            return new $root.commands.GetStateCommand();
        };

        /**
         * Creates a plain object from a GetStateCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.GetStateCommand
         * @static
         * @param {commands.GetStateCommand} message GetStateCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetStateCommand.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this GetStateCommand to JSON.
         * @function toJSON
         * @memberof commands.GetStateCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetStateCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetStateCommand
         * @function getTypeUrl
         * @memberof commands.GetStateCommand
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetStateCommand.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.GetStateCommand";
        };

        return GetStateCommand;
    })();

    commands.ErrorResponse = (function() {

        /**
         * Properties of an ErrorResponse.
         * @memberof commands
         * @interface IErrorResponse
         * @property {string|null} [message] ErrorResponse message
         */

        /**
         * Constructs a new ErrorResponse.
         * @memberof commands
         * @classdesc Represents an ErrorResponse.
         * @implements IErrorResponse
         * @constructor
         * @param {commands.IErrorResponse=} [properties] Properties to set
         */
        function ErrorResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ErrorResponse message.
         * @member {string} message
         * @memberof commands.ErrorResponse
         * @instance
         */
        ErrorResponse.prototype.message = "";

        /**
         * Creates a new ErrorResponse instance using the specified properties.
         * @function create
         * @memberof commands.ErrorResponse
         * @static
         * @param {commands.IErrorResponse=} [properties] Properties to set
         * @returns {commands.ErrorResponse} ErrorResponse instance
         */
        ErrorResponse.create = function create(properties) {
            return new ErrorResponse(properties);
        };

        /**
         * Encodes the specified ErrorResponse message. Does not implicitly {@link commands.ErrorResponse.verify|verify} messages.
         * @function encode
         * @memberof commands.ErrorResponse
         * @static
         * @param {commands.IErrorResponse} message ErrorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified ErrorResponse message, length delimited. Does not implicitly {@link commands.ErrorResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.ErrorResponse
         * @static
         * @param {commands.IErrorResponse} message ErrorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer.
         * @function decode
         * @memberof commands.ErrorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.ErrorResponse} ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.ErrorResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.message = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.ErrorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.ErrorResponse} ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ErrorResponse message.
         * @function verify
         * @memberof commands.ErrorResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ErrorResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates an ErrorResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.ErrorResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.ErrorResponse} ErrorResponse
         */
        ErrorResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.ErrorResponse)
                return object;
            let message = new $root.commands.ErrorResponse();
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from an ErrorResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.ErrorResponse
         * @static
         * @param {commands.ErrorResponse} message ErrorResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ErrorResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.message = "";
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this ErrorResponse to JSON.
         * @function toJSON
         * @memberof commands.ErrorResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ErrorResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ErrorResponse
         * @function getTypeUrl
         * @memberof commands.ErrorResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ErrorResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.ErrorResponse";
        };

        return ErrorResponse;
    })();

    commands.CounterResponse = (function() {

        /**
         * Properties of a CounterResponse.
         * @memberof commands
         * @interface ICounterResponse
         * @property {number|null} [value] CounterResponse value
         */

        /**
         * Constructs a new CounterResponse.
         * @memberof commands
         * @classdesc Represents a CounterResponse.
         * @implements ICounterResponse
         * @constructor
         * @param {commands.ICounterResponse=} [properties] Properties to set
         */
        function CounterResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CounterResponse value.
         * @member {number} value
         * @memberof commands.CounterResponse
         * @instance
         */
        CounterResponse.prototype.value = 0;

        /**
         * Creates a new CounterResponse instance using the specified properties.
         * @function create
         * @memberof commands.CounterResponse
         * @static
         * @param {commands.ICounterResponse=} [properties] Properties to set
         * @returns {commands.CounterResponse} CounterResponse instance
         */
        CounterResponse.create = function create(properties) {
            return new CounterResponse(properties);
        };

        /**
         * Encodes the specified CounterResponse message. Does not implicitly {@link commands.CounterResponse.verify|verify} messages.
         * @function encode
         * @memberof commands.CounterResponse
         * @static
         * @param {commands.ICounterResponse} message CounterResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CounterResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.value);
            return writer;
        };

        /**
         * Encodes the specified CounterResponse message, length delimited. Does not implicitly {@link commands.CounterResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.CounterResponse
         * @static
         * @param {commands.ICounterResponse} message CounterResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CounterResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CounterResponse message from the specified reader or buffer.
         * @function decode
         * @memberof commands.CounterResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.CounterResponse} CounterResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CounterResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.CounterResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.value = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CounterResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.CounterResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.CounterResponse} CounterResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CounterResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CounterResponse message.
         * @function verify
         * @memberof commands.CounterResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CounterResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!$util.isInteger(message.value))
                    return "value: integer expected";
            return null;
        };

        /**
         * Creates a CounterResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.CounterResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.CounterResponse} CounterResponse
         */
        CounterResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.CounterResponse)
                return object;
            let message = new $root.commands.CounterResponse();
            if (object.value != null)
                message.value = object.value | 0;
            return message;
        };

        /**
         * Creates a plain object from a CounterResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.CounterResponse
         * @static
         * @param {commands.CounterResponse} message CounterResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CounterResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.value = 0;
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this CounterResponse to JSON.
         * @function toJSON
         * @memberof commands.CounterResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CounterResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for CounterResponse
         * @function getTypeUrl
         * @memberof commands.CounterResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        CounterResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.CounterResponse";
        };

        return CounterResponse;
    })();

    commands.UserResponse = (function() {

        /**
         * Properties of a UserResponse.
         * @memberof commands
         * @interface IUserResponse
         * @property {commands.IUser|null} [user] UserResponse user
         */

        /**
         * Constructs a new UserResponse.
         * @memberof commands
         * @classdesc Represents a UserResponse.
         * @implements IUserResponse
         * @constructor
         * @param {commands.IUserResponse=} [properties] Properties to set
         */
        function UserResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserResponse user.
         * @member {commands.IUser|null|undefined} user
         * @memberof commands.UserResponse
         * @instance
         */
        UserResponse.prototype.user = null;

        /**
         * Creates a new UserResponse instance using the specified properties.
         * @function create
         * @memberof commands.UserResponse
         * @static
         * @param {commands.IUserResponse=} [properties] Properties to set
         * @returns {commands.UserResponse} UserResponse instance
         */
        UserResponse.create = function create(properties) {
            return new UserResponse(properties);
        };

        /**
         * Encodes the specified UserResponse message. Does not implicitly {@link commands.UserResponse.verify|verify} messages.
         * @function encode
         * @memberof commands.UserResponse
         * @static
         * @param {commands.IUserResponse} message UserResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.user != null && Object.hasOwnProperty.call(message, "user"))
                $root.commands.User.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UserResponse message, length delimited. Does not implicitly {@link commands.UserResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.UserResponse
         * @static
         * @param {commands.IUserResponse} message UserResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserResponse message from the specified reader or buffer.
         * @function decode
         * @memberof commands.UserResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.UserResponse} UserResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.UserResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.user = $root.commands.User.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.UserResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.UserResponse} UserResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserResponse message.
         * @function verify
         * @memberof commands.UserResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.user != null && message.hasOwnProperty("user")) {
                let error = $root.commands.User.verify(message.user);
                if (error)
                    return "user." + error;
            }
            return null;
        };

        /**
         * Creates a UserResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.UserResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.UserResponse} UserResponse
         */
        UserResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.UserResponse)
                return object;
            let message = new $root.commands.UserResponse();
            if (object.user != null) {
                if (typeof object.user !== "object")
                    throw TypeError(".commands.UserResponse.user: object expected");
                message.user = $root.commands.User.fromObject(object.user);
            }
            return message;
        };

        /**
         * Creates a plain object from a UserResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.UserResponse
         * @static
         * @param {commands.UserResponse} message UserResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.user = null;
            if (message.user != null && message.hasOwnProperty("user"))
                object.user = $root.commands.User.toObject(message.user, options);
            return object;
        };

        /**
         * Converts this UserResponse to JSON.
         * @function toJSON
         * @memberof commands.UserResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserResponse
         * @function getTypeUrl
         * @memberof commands.UserResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.UserResponse";
        };

        return UserResponse;
    })();

    commands.UsersResponse = (function() {

        /**
         * Properties of a UsersResponse.
         * @memberof commands
         * @interface IUsersResponse
         * @property {Array.<commands.IUser>|null} [users] UsersResponse users
         */

        /**
         * Constructs a new UsersResponse.
         * @memberof commands
         * @classdesc Represents a UsersResponse.
         * @implements IUsersResponse
         * @constructor
         * @param {commands.IUsersResponse=} [properties] Properties to set
         */
        function UsersResponse(properties) {
            this.users = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UsersResponse users.
         * @member {Array.<commands.IUser>} users
         * @memberof commands.UsersResponse
         * @instance
         */
        UsersResponse.prototype.users = $util.emptyArray;

        /**
         * Creates a new UsersResponse instance using the specified properties.
         * @function create
         * @memberof commands.UsersResponse
         * @static
         * @param {commands.IUsersResponse=} [properties] Properties to set
         * @returns {commands.UsersResponse} UsersResponse instance
         */
        UsersResponse.create = function create(properties) {
            return new UsersResponse(properties);
        };

        /**
         * Encodes the specified UsersResponse message. Does not implicitly {@link commands.UsersResponse.verify|verify} messages.
         * @function encode
         * @memberof commands.UsersResponse
         * @static
         * @param {commands.IUsersResponse} message UsersResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UsersResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.users != null && message.users.length)
                for (let i = 0; i < message.users.length; ++i)
                    $root.commands.User.encode(message.users[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UsersResponse message, length delimited. Does not implicitly {@link commands.UsersResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.UsersResponse
         * @static
         * @param {commands.IUsersResponse} message UsersResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UsersResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UsersResponse message from the specified reader or buffer.
         * @function decode
         * @memberof commands.UsersResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.UsersResponse} UsersResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UsersResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.UsersResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.users && message.users.length))
                            message.users = [];
                        message.users.push($root.commands.User.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UsersResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.UsersResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.UsersResponse} UsersResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UsersResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UsersResponse message.
         * @function verify
         * @memberof commands.UsersResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UsersResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.users != null && message.hasOwnProperty("users")) {
                if (!Array.isArray(message.users))
                    return "users: array expected";
                for (let i = 0; i < message.users.length; ++i) {
                    let error = $root.commands.User.verify(message.users[i]);
                    if (error)
                        return "users." + error;
                }
            }
            return null;
        };

        /**
         * Creates a UsersResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.UsersResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.UsersResponse} UsersResponse
         */
        UsersResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.UsersResponse)
                return object;
            let message = new $root.commands.UsersResponse();
            if (object.users) {
                if (!Array.isArray(object.users))
                    throw TypeError(".commands.UsersResponse.users: array expected");
                message.users = [];
                for (let i = 0; i < object.users.length; ++i) {
                    if (typeof object.users[i] !== "object")
                        throw TypeError(".commands.UsersResponse.users: object expected");
                    message.users[i] = $root.commands.User.fromObject(object.users[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a UsersResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.UsersResponse
         * @static
         * @param {commands.UsersResponse} message UsersResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UsersResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.users = [];
            if (message.users && message.users.length) {
                object.users = [];
                for (let j = 0; j < message.users.length; ++j)
                    object.users[j] = $root.commands.User.toObject(message.users[j], options);
            }
            return object;
        };

        /**
         * Converts this UsersResponse to JSON.
         * @function toJSON
         * @memberof commands.UsersResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UsersResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UsersResponse
         * @function getTypeUrl
         * @memberof commands.UsersResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UsersResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.UsersResponse";
        };

        return UsersResponse;
    })();

    commands.SuccessResponse = (function() {

        /**
         * Properties of a SuccessResponse.
         * @memberof commands
         * @interface ISuccessResponse
         * @property {boolean|null} [success] SuccessResponse success
         */

        /**
         * Constructs a new SuccessResponse.
         * @memberof commands
         * @classdesc Represents a SuccessResponse.
         * @implements ISuccessResponse
         * @constructor
         * @param {commands.ISuccessResponse=} [properties] Properties to set
         */
        function SuccessResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SuccessResponse success.
         * @member {boolean} success
         * @memberof commands.SuccessResponse
         * @instance
         */
        SuccessResponse.prototype.success = false;

        /**
         * Creates a new SuccessResponse instance using the specified properties.
         * @function create
         * @memberof commands.SuccessResponse
         * @static
         * @param {commands.ISuccessResponse=} [properties] Properties to set
         * @returns {commands.SuccessResponse} SuccessResponse instance
         */
        SuccessResponse.create = function create(properties) {
            return new SuccessResponse(properties);
        };

        /**
         * Encodes the specified SuccessResponse message. Does not implicitly {@link commands.SuccessResponse.verify|verify} messages.
         * @function encode
         * @memberof commands.SuccessResponse
         * @static
         * @param {commands.ISuccessResponse} message SuccessResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SuccessResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
            return writer;
        };

        /**
         * Encodes the specified SuccessResponse message, length delimited. Does not implicitly {@link commands.SuccessResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.SuccessResponse
         * @static
         * @param {commands.ISuccessResponse} message SuccessResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SuccessResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SuccessResponse message from the specified reader or buffer.
         * @function decode
         * @memberof commands.SuccessResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.SuccessResponse} SuccessResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SuccessResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.SuccessResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.success = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SuccessResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.SuccessResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.SuccessResponse} SuccessResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SuccessResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SuccessResponse message.
         * @function verify
         * @memberof commands.SuccessResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SuccessResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.success != null && message.hasOwnProperty("success"))
                if (typeof message.success !== "boolean")
                    return "success: boolean expected";
            return null;
        };

        /**
         * Creates a SuccessResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.SuccessResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.SuccessResponse} SuccessResponse
         */
        SuccessResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.SuccessResponse)
                return object;
            let message = new $root.commands.SuccessResponse();
            if (object.success != null)
                message.success = Boolean(object.success);
            return message;
        };

        /**
         * Creates a plain object from a SuccessResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.SuccessResponse
         * @static
         * @param {commands.SuccessResponse} message SuccessResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SuccessResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.success = false;
            if (message.success != null && message.hasOwnProperty("success"))
                object.success = message.success;
            return object;
        };

        /**
         * Converts this SuccessResponse to JSON.
         * @function toJSON
         * @memberof commands.SuccessResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SuccessResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SuccessResponse
         * @function getTypeUrl
         * @memberof commands.SuccessResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SuccessResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.SuccessResponse";
        };

        return SuccessResponse;
    })();

    commands.SumResponse = (function() {

        /**
         * Properties of a SumResponse.
         * @memberof commands
         * @interface ISumResponse
         * @property {number|null} [result] SumResponse result
         */

        /**
         * Constructs a new SumResponse.
         * @memberof commands
         * @classdesc Represents a SumResponse.
         * @implements ISumResponse
         * @constructor
         * @param {commands.ISumResponse=} [properties] Properties to set
         */
        function SumResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SumResponse result.
         * @member {number} result
         * @memberof commands.SumResponse
         * @instance
         */
        SumResponse.prototype.result = 0;

        /**
         * Creates a new SumResponse instance using the specified properties.
         * @function create
         * @memberof commands.SumResponse
         * @static
         * @param {commands.ISumResponse=} [properties] Properties to set
         * @returns {commands.SumResponse} SumResponse instance
         */
        SumResponse.create = function create(properties) {
            return new SumResponse(properties);
        };

        /**
         * Encodes the specified SumResponse message. Does not implicitly {@link commands.SumResponse.verify|verify} messages.
         * @function encode
         * @memberof commands.SumResponse
         * @static
         * @param {commands.ISumResponse} message SumResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SumResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
            return writer;
        };

        /**
         * Encodes the specified SumResponse message, length delimited. Does not implicitly {@link commands.SumResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.SumResponse
         * @static
         * @param {commands.ISumResponse} message SumResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SumResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SumResponse message from the specified reader or buffer.
         * @function decode
         * @memberof commands.SumResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.SumResponse} SumResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SumResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.SumResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.result = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SumResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.SumResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.SumResponse} SumResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SumResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SumResponse message.
         * @function verify
         * @memberof commands.SumResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SumResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.result != null && message.hasOwnProperty("result"))
                if (!$util.isInteger(message.result))
                    return "result: integer expected";
            return null;
        };

        /**
         * Creates a SumResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.SumResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.SumResponse} SumResponse
         */
        SumResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.SumResponse)
                return object;
            let message = new $root.commands.SumResponse();
            if (object.result != null)
                message.result = object.result | 0;
            return message;
        };

        /**
         * Creates a plain object from a SumResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.SumResponse
         * @static
         * @param {commands.SumResponse} message SumResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SumResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.result = 0;
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = message.result;
            return object;
        };

        /**
         * Converts this SumResponse to JSON.
         * @function toJSON
         * @memberof commands.SumResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SumResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SumResponse
         * @function getTypeUrl
         * @memberof commands.SumResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SumResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.SumResponse";
        };

        return SumResponse;
    })();

    commands.ValidationResponse = (function() {

        /**
         * Properties of a ValidationResponse.
         * @memberof commands
         * @interface IValidationResponse
         * @property {boolean|null} [isValid] ValidationResponse isValid
         * @property {Array.<string>|null} [errors] ValidationResponse errors
         */

        /**
         * Constructs a new ValidationResponse.
         * @memberof commands
         * @classdesc Represents a ValidationResponse.
         * @implements IValidationResponse
         * @constructor
         * @param {commands.IValidationResponse=} [properties] Properties to set
         */
        function ValidationResponse(properties) {
            this.errors = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ValidationResponse isValid.
         * @member {boolean} isValid
         * @memberof commands.ValidationResponse
         * @instance
         */
        ValidationResponse.prototype.isValid = false;

        /**
         * ValidationResponse errors.
         * @member {Array.<string>} errors
         * @memberof commands.ValidationResponse
         * @instance
         */
        ValidationResponse.prototype.errors = $util.emptyArray;

        /**
         * Creates a new ValidationResponse instance using the specified properties.
         * @function create
         * @memberof commands.ValidationResponse
         * @static
         * @param {commands.IValidationResponse=} [properties] Properties to set
         * @returns {commands.ValidationResponse} ValidationResponse instance
         */
        ValidationResponse.create = function create(properties) {
            return new ValidationResponse(properties);
        };

        /**
         * Encodes the specified ValidationResponse message. Does not implicitly {@link commands.ValidationResponse.verify|verify} messages.
         * @function encode
         * @memberof commands.ValidationResponse
         * @static
         * @param {commands.IValidationResponse} message ValidationResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidationResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.isValid != null && Object.hasOwnProperty.call(message, "isValid"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isValid);
            if (message.errors != null && message.errors.length)
                for (let i = 0; i < message.errors.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.errors[i]);
            return writer;
        };

        /**
         * Encodes the specified ValidationResponse message, length delimited. Does not implicitly {@link commands.ValidationResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.ValidationResponse
         * @static
         * @param {commands.IValidationResponse} message ValidationResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidationResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ValidationResponse message from the specified reader or buffer.
         * @function decode
         * @memberof commands.ValidationResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.ValidationResponse} ValidationResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidationResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.ValidationResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.isValid = reader.bool();
                        break;
                    }
                case 2: {
                        if (!(message.errors && message.errors.length))
                            message.errors = [];
                        message.errors.push(reader.string());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ValidationResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.ValidationResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.ValidationResponse} ValidationResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidationResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ValidationResponse message.
         * @function verify
         * @memberof commands.ValidationResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ValidationResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.isValid != null && message.hasOwnProperty("isValid"))
                if (typeof message.isValid !== "boolean")
                    return "isValid: boolean expected";
            if (message.errors != null && message.hasOwnProperty("errors")) {
                if (!Array.isArray(message.errors))
                    return "errors: array expected";
                for (let i = 0; i < message.errors.length; ++i)
                    if (!$util.isString(message.errors[i]))
                        return "errors: string[] expected";
            }
            return null;
        };

        /**
         * Creates a ValidationResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.ValidationResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.ValidationResponse} ValidationResponse
         */
        ValidationResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.ValidationResponse)
                return object;
            let message = new $root.commands.ValidationResponse();
            if (object.isValid != null)
                message.isValid = Boolean(object.isValid);
            if (object.errors) {
                if (!Array.isArray(object.errors))
                    throw TypeError(".commands.ValidationResponse.errors: array expected");
                message.errors = [];
                for (let i = 0; i < object.errors.length; ++i)
                    message.errors[i] = String(object.errors[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a ValidationResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.ValidationResponse
         * @static
         * @param {commands.ValidationResponse} message ValidationResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ValidationResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.errors = [];
            if (options.defaults)
                object.isValid = false;
            if (message.isValid != null && message.hasOwnProperty("isValid"))
                object.isValid = message.isValid;
            if (message.errors && message.errors.length) {
                object.errors = [];
                for (let j = 0; j < message.errors.length; ++j)
                    object.errors[j] = message.errors[j];
            }
            return object;
        };

        /**
         * Converts this ValidationResponse to JSON.
         * @function toJSON
         * @memberof commands.ValidationResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ValidationResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ValidationResponse
         * @function getTypeUrl
         * @memberof commands.ValidationResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ValidationResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.ValidationResponse";
        };

        return ValidationResponse;
    })();

    commands.ConfigurationResponse = (function() {

        /**
         * Properties of a ConfigurationResponse.
         * @memberof commands
         * @interface IConfigurationResponse
         * @property {commands.IConfiguration|null} [config] ConfigurationResponse config
         */

        /**
         * Constructs a new ConfigurationResponse.
         * @memberof commands
         * @classdesc Represents a ConfigurationResponse.
         * @implements IConfigurationResponse
         * @constructor
         * @param {commands.IConfigurationResponse=} [properties] Properties to set
         */
        function ConfigurationResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ConfigurationResponse config.
         * @member {commands.IConfiguration|null|undefined} config
         * @memberof commands.ConfigurationResponse
         * @instance
         */
        ConfigurationResponse.prototype.config = null;

        /**
         * Creates a new ConfigurationResponse instance using the specified properties.
         * @function create
         * @memberof commands.ConfigurationResponse
         * @static
         * @param {commands.IConfigurationResponse=} [properties] Properties to set
         * @returns {commands.ConfigurationResponse} ConfigurationResponse instance
         */
        ConfigurationResponse.create = function create(properties) {
            return new ConfigurationResponse(properties);
        };

        /**
         * Encodes the specified ConfigurationResponse message. Does not implicitly {@link commands.ConfigurationResponse.verify|verify} messages.
         * @function encode
         * @memberof commands.ConfigurationResponse
         * @static
         * @param {commands.IConfigurationResponse} message ConfigurationResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ConfigurationResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                $root.commands.Configuration.encode(message.config, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ConfigurationResponse message, length delimited. Does not implicitly {@link commands.ConfigurationResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.ConfigurationResponse
         * @static
         * @param {commands.IConfigurationResponse} message ConfigurationResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ConfigurationResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ConfigurationResponse message from the specified reader or buffer.
         * @function decode
         * @memberof commands.ConfigurationResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.ConfigurationResponse} ConfigurationResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ConfigurationResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.ConfigurationResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.config = $root.commands.Configuration.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ConfigurationResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.ConfigurationResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.ConfigurationResponse} ConfigurationResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ConfigurationResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ConfigurationResponse message.
         * @function verify
         * @memberof commands.ConfigurationResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ConfigurationResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.config != null && message.hasOwnProperty("config")) {
                let error = $root.commands.Configuration.verify(message.config);
                if (error)
                    return "config." + error;
            }
            return null;
        };

        /**
         * Creates a ConfigurationResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.ConfigurationResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.ConfigurationResponse} ConfigurationResponse
         */
        ConfigurationResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.ConfigurationResponse)
                return object;
            let message = new $root.commands.ConfigurationResponse();
            if (object.config != null) {
                if (typeof object.config !== "object")
                    throw TypeError(".commands.ConfigurationResponse.config: object expected");
                message.config = $root.commands.Configuration.fromObject(object.config);
            }
            return message;
        };

        /**
         * Creates a plain object from a ConfigurationResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.ConfigurationResponse
         * @static
         * @param {commands.ConfigurationResponse} message ConfigurationResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ConfigurationResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.config = null;
            if (message.config != null && message.hasOwnProperty("config"))
                object.config = $root.commands.Configuration.toObject(message.config, options);
            return object;
        };

        /**
         * Converts this ConfigurationResponse to JSON.
         * @function toJSON
         * @memberof commands.ConfigurationResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ConfigurationResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ConfigurationResponse
         * @function getTypeUrl
         * @memberof commands.ConfigurationResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ConfigurationResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.ConfigurationResponse";
        };

        return ConfigurationResponse;
    })();

    commands.StateResponse = (function() {

        /**
         * Properties of a StateResponse.
         * @memberof commands
         * @interface IStateResponse
         * @property {number|null} [counter] StateResponse counter
         * @property {Array.<commands.IUser>|null} [users] StateResponse users
         * @property {commands.IConfiguration|null} [config] StateResponse config
         */

        /**
         * Constructs a new StateResponse.
         * @memberof commands
         * @classdesc Represents a StateResponse.
         * @implements IStateResponse
         * @constructor
         * @param {commands.IStateResponse=} [properties] Properties to set
         */
        function StateResponse(properties) {
            this.users = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StateResponse counter.
         * @member {number} counter
         * @memberof commands.StateResponse
         * @instance
         */
        StateResponse.prototype.counter = 0;

        /**
         * StateResponse users.
         * @member {Array.<commands.IUser>} users
         * @memberof commands.StateResponse
         * @instance
         */
        StateResponse.prototype.users = $util.emptyArray;

        /**
         * StateResponse config.
         * @member {commands.IConfiguration|null|undefined} config
         * @memberof commands.StateResponse
         * @instance
         */
        StateResponse.prototype.config = null;

        /**
         * Creates a new StateResponse instance using the specified properties.
         * @function create
         * @memberof commands.StateResponse
         * @static
         * @param {commands.IStateResponse=} [properties] Properties to set
         * @returns {commands.StateResponse} StateResponse instance
         */
        StateResponse.create = function create(properties) {
            return new StateResponse(properties);
        };

        /**
         * Encodes the specified StateResponse message. Does not implicitly {@link commands.StateResponse.verify|verify} messages.
         * @function encode
         * @memberof commands.StateResponse
         * @static
         * @param {commands.IStateResponse} message StateResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StateResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.counter != null && Object.hasOwnProperty.call(message, "counter"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.counter);
            if (message.users != null && message.users.length)
                for (let i = 0; i < message.users.length; ++i)
                    $root.commands.User.encode(message.users[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                $root.commands.Configuration.encode(message.config, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified StateResponse message, length delimited. Does not implicitly {@link commands.StateResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.StateResponse
         * @static
         * @param {commands.IStateResponse} message StateResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StateResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StateResponse message from the specified reader or buffer.
         * @function decode
         * @memberof commands.StateResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.StateResponse} StateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StateResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.StateResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.counter = reader.int32();
                        break;
                    }
                case 2: {
                        if (!(message.users && message.users.length))
                            message.users = [];
                        message.users.push($root.commands.User.decode(reader, reader.uint32()));
                        break;
                    }
                case 3: {
                        message.config = $root.commands.Configuration.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StateResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.StateResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.StateResponse} StateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StateResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StateResponse message.
         * @function verify
         * @memberof commands.StateResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StateResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.counter != null && message.hasOwnProperty("counter"))
                if (!$util.isInteger(message.counter))
                    return "counter: integer expected";
            if (message.users != null && message.hasOwnProperty("users")) {
                if (!Array.isArray(message.users))
                    return "users: array expected";
                for (let i = 0; i < message.users.length; ++i) {
                    let error = $root.commands.User.verify(message.users[i]);
                    if (error)
                        return "users." + error;
                }
            }
            if (message.config != null && message.hasOwnProperty("config")) {
                let error = $root.commands.Configuration.verify(message.config);
                if (error)
                    return "config." + error;
            }
            return null;
        };

        /**
         * Creates a StateResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.StateResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.StateResponse} StateResponse
         */
        StateResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.StateResponse)
                return object;
            let message = new $root.commands.StateResponse();
            if (object.counter != null)
                message.counter = object.counter | 0;
            if (object.users) {
                if (!Array.isArray(object.users))
                    throw TypeError(".commands.StateResponse.users: array expected");
                message.users = [];
                for (let i = 0; i < object.users.length; ++i) {
                    if (typeof object.users[i] !== "object")
                        throw TypeError(".commands.StateResponse.users: object expected");
                    message.users[i] = $root.commands.User.fromObject(object.users[i]);
                }
            }
            if (object.config != null) {
                if (typeof object.config !== "object")
                    throw TypeError(".commands.StateResponse.config: object expected");
                message.config = $root.commands.Configuration.fromObject(object.config);
            }
            return message;
        };

        /**
         * Creates a plain object from a StateResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.StateResponse
         * @static
         * @param {commands.StateResponse} message StateResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StateResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.users = [];
            if (options.defaults) {
                object.counter = 0;
                object.config = null;
            }
            if (message.counter != null && message.hasOwnProperty("counter"))
                object.counter = message.counter;
            if (message.users && message.users.length) {
                object.users = [];
                for (let j = 0; j < message.users.length; ++j)
                    object.users[j] = $root.commands.User.toObject(message.users[j], options);
            }
            if (message.config != null && message.hasOwnProperty("config"))
                object.config = $root.commands.Configuration.toObject(message.config, options);
            return object;
        };

        /**
         * Converts this StateResponse to JSON.
         * @function toJSON
         * @memberof commands.StateResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StateResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for StateResponse
         * @function getTypeUrl
         * @memberof commands.StateResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        StateResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.StateResponse";
        };

        return StateResponse;
    })();

    commands.User = (function() {

        /**
         * Properties of a User.
         * @memberof commands
         * @interface IUser
         * @property {string|null} [id] User id
         * @property {string|null} [name] User name
         * @property {string|null} [email] User email
         * @property {number|Long|null} [createdAt] User createdAt
         */

        /**
         * Constructs a new User.
         * @memberof commands
         * @classdesc Represents a User.
         * @implements IUser
         * @constructor
         * @param {commands.IUser=} [properties] Properties to set
         */
        function User(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * User id.
         * @member {string} id
         * @memberof commands.User
         * @instance
         */
        User.prototype.id = "";

        /**
         * User name.
         * @member {string} name
         * @memberof commands.User
         * @instance
         */
        User.prototype.name = "";

        /**
         * User email.
         * @member {string} email
         * @memberof commands.User
         * @instance
         */
        User.prototype.email = "";

        /**
         * User createdAt.
         * @member {number|Long} createdAt
         * @memberof commands.User
         * @instance
         */
        User.prototype.createdAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new User instance using the specified properties.
         * @function create
         * @memberof commands.User
         * @static
         * @param {commands.IUser=} [properties] Properties to set
         * @returns {commands.User} User instance
         */
        User.create = function create(properties) {
            return new User(properties);
        };

        /**
         * Encodes the specified User message. Does not implicitly {@link commands.User.verify|verify} messages.
         * @function encode
         * @memberof commands.User
         * @static
         * @param {commands.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.email);
            if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.createdAt);
            return writer;
        };

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link commands.User.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.User
         * @static
         * @param {commands.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a User message from the specified reader or buffer.
         * @function decode
         * @memberof commands.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.User();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.string();
                        break;
                    }
                case 2: {
                        message.name = reader.string();
                        break;
                    }
                case 3: {
                        message.email = reader.string();
                        break;
                    }
                case 4: {
                        message.createdAt = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a User message.
         * @function verify
         * @memberof commands.User
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        User.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.email != null && message.hasOwnProperty("email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                if (!$util.isInteger(message.createdAt) && !(message.createdAt && $util.isInteger(message.createdAt.low) && $util.isInteger(message.createdAt.high)))
                    return "createdAt: integer|Long expected";
            return null;
        };

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.User
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.User} User
         */
        User.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.User)
                return object;
            let message = new $root.commands.User();
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            if (object.email != null)
                message.email = String(object.email);
            if (object.createdAt != null)
                if ($util.Long)
                    (message.createdAt = $util.Long.fromValue(object.createdAt)).unsigned = false;
                else if (typeof object.createdAt === "string")
                    message.createdAt = parseInt(object.createdAt, 10);
                else if (typeof object.createdAt === "number")
                    message.createdAt = object.createdAt;
                else if (typeof object.createdAt === "object")
                    message.createdAt = new $util.LongBits(object.createdAt.low >>> 0, object.createdAt.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.User
         * @static
         * @param {commands.User} message User
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        User.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.name = "";
                object.email = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.createdAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.createdAt = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.email != null && message.hasOwnProperty("email"))
                object.email = message.email;
            if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                if (typeof message.createdAt === "number")
                    object.createdAt = options.longs === String ? String(message.createdAt) : message.createdAt;
                else
                    object.createdAt = options.longs === String ? $util.Long.prototype.toString.call(message.createdAt) : options.longs === Number ? new $util.LongBits(message.createdAt.low >>> 0, message.createdAt.high >>> 0).toNumber() : message.createdAt;
            return object;
        };

        /**
         * Converts this User to JSON.
         * @function toJSON
         * @memberof commands.User
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        User.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for User
         * @function getTypeUrl
         * @memberof commands.User
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        User.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.User";
        };

        return User;
    })();

    commands.Configuration = (function() {

        /**
         * Properties of a Configuration.
         * @memberof commands
         * @interface IConfiguration
         * @property {string|null} [version] Configuration version
         * @property {commands.IFeatures|null} [features] Configuration features
         * @property {string|null} [apiEndpoint] Configuration apiEndpoint
         * @property {number|null} [maxRetries] Configuration maxRetries
         */

        /**
         * Constructs a new Configuration.
         * @memberof commands
         * @classdesc Represents a Configuration.
         * @implements IConfiguration
         * @constructor
         * @param {commands.IConfiguration=} [properties] Properties to set
         */
        function Configuration(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Configuration version.
         * @member {string} version
         * @memberof commands.Configuration
         * @instance
         */
        Configuration.prototype.version = "";

        /**
         * Configuration features.
         * @member {commands.IFeatures|null|undefined} features
         * @memberof commands.Configuration
         * @instance
         */
        Configuration.prototype.features = null;

        /**
         * Configuration apiEndpoint.
         * @member {string} apiEndpoint
         * @memberof commands.Configuration
         * @instance
         */
        Configuration.prototype.apiEndpoint = "";

        /**
         * Configuration maxRetries.
         * @member {number} maxRetries
         * @memberof commands.Configuration
         * @instance
         */
        Configuration.prototype.maxRetries = 0;

        /**
         * Creates a new Configuration instance using the specified properties.
         * @function create
         * @memberof commands.Configuration
         * @static
         * @param {commands.IConfiguration=} [properties] Properties to set
         * @returns {commands.Configuration} Configuration instance
         */
        Configuration.create = function create(properties) {
            return new Configuration(properties);
        };

        /**
         * Encodes the specified Configuration message. Does not implicitly {@link commands.Configuration.verify|verify} messages.
         * @function encode
         * @memberof commands.Configuration
         * @static
         * @param {commands.IConfiguration} message Configuration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Configuration.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.version);
            if (message.features != null && Object.hasOwnProperty.call(message, "features"))
                $root.commands.Features.encode(message.features, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.apiEndpoint != null && Object.hasOwnProperty.call(message, "apiEndpoint"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.apiEndpoint);
            if (message.maxRetries != null && Object.hasOwnProperty.call(message, "maxRetries"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.maxRetries);
            return writer;
        };

        /**
         * Encodes the specified Configuration message, length delimited. Does not implicitly {@link commands.Configuration.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.Configuration
         * @static
         * @param {commands.IConfiguration} message Configuration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Configuration.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Configuration message from the specified reader or buffer.
         * @function decode
         * @memberof commands.Configuration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.Configuration} Configuration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Configuration.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.Configuration();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.version = reader.string();
                        break;
                    }
                case 2: {
                        message.features = $root.commands.Features.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.apiEndpoint = reader.string();
                        break;
                    }
                case 4: {
                        message.maxRetries = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Configuration message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.Configuration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.Configuration} Configuration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Configuration.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Configuration message.
         * @function verify
         * @memberof commands.Configuration
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Configuration.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isString(message.version))
                    return "version: string expected";
            if (message.features != null && message.hasOwnProperty("features")) {
                let error = $root.commands.Features.verify(message.features);
                if (error)
                    return "features." + error;
            }
            if (message.apiEndpoint != null && message.hasOwnProperty("apiEndpoint"))
                if (!$util.isString(message.apiEndpoint))
                    return "apiEndpoint: string expected";
            if (message.maxRetries != null && message.hasOwnProperty("maxRetries"))
                if (!$util.isInteger(message.maxRetries))
                    return "maxRetries: integer expected";
            return null;
        };

        /**
         * Creates a Configuration message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.Configuration
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.Configuration} Configuration
         */
        Configuration.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.Configuration)
                return object;
            let message = new $root.commands.Configuration();
            if (object.version != null)
                message.version = String(object.version);
            if (object.features != null) {
                if (typeof object.features !== "object")
                    throw TypeError(".commands.Configuration.features: object expected");
                message.features = $root.commands.Features.fromObject(object.features);
            }
            if (object.apiEndpoint != null)
                message.apiEndpoint = String(object.apiEndpoint);
            if (object.maxRetries != null)
                message.maxRetries = object.maxRetries | 0;
            return message;
        };

        /**
         * Creates a plain object from a Configuration message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.Configuration
         * @static
         * @param {commands.Configuration} message Configuration
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Configuration.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.version = "";
                object.features = null;
                object.apiEndpoint = "";
                object.maxRetries = 0;
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.features != null && message.hasOwnProperty("features"))
                object.features = $root.commands.Features.toObject(message.features, options);
            if (message.apiEndpoint != null && message.hasOwnProperty("apiEndpoint"))
                object.apiEndpoint = message.apiEndpoint;
            if (message.maxRetries != null && message.hasOwnProperty("maxRetries"))
                object.maxRetries = message.maxRetries;
            return object;
        };

        /**
         * Converts this Configuration to JSON.
         * @function toJSON
         * @memberof commands.Configuration
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Configuration.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Configuration
         * @function getTypeUrl
         * @memberof commands.Configuration
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Configuration.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.Configuration";
        };

        return Configuration;
    })();

    commands.Features = (function() {

        /**
         * Properties of a Features.
         * @memberof commands
         * @interface IFeatures
         * @property {boolean|null} [analytics] Features analytics
         * @property {boolean|null} [notifications] Features notifications
         * @property {boolean|null} [darkMode] Features darkMode
         */

        /**
         * Constructs a new Features.
         * @memberof commands
         * @classdesc Represents a Features.
         * @implements IFeatures
         * @constructor
         * @param {commands.IFeatures=} [properties] Properties to set
         */
        function Features(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Features analytics.
         * @member {boolean} analytics
         * @memberof commands.Features
         * @instance
         */
        Features.prototype.analytics = false;

        /**
         * Features notifications.
         * @member {boolean} notifications
         * @memberof commands.Features
         * @instance
         */
        Features.prototype.notifications = false;

        /**
         * Features darkMode.
         * @member {boolean} darkMode
         * @memberof commands.Features
         * @instance
         */
        Features.prototype.darkMode = false;

        /**
         * Creates a new Features instance using the specified properties.
         * @function create
         * @memberof commands.Features
         * @static
         * @param {commands.IFeatures=} [properties] Properties to set
         * @returns {commands.Features} Features instance
         */
        Features.create = function create(properties) {
            return new Features(properties);
        };

        /**
         * Encodes the specified Features message. Does not implicitly {@link commands.Features.verify|verify} messages.
         * @function encode
         * @memberof commands.Features
         * @static
         * @param {commands.IFeatures} message Features message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Features.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.analytics != null && Object.hasOwnProperty.call(message, "analytics"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.analytics);
            if (message.notifications != null && Object.hasOwnProperty.call(message, "notifications"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.notifications);
            if (message.darkMode != null && Object.hasOwnProperty.call(message, "darkMode"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.darkMode);
            return writer;
        };

        /**
         * Encodes the specified Features message, length delimited. Does not implicitly {@link commands.Features.verify|verify} messages.
         * @function encodeDelimited
         * @memberof commands.Features
         * @static
         * @param {commands.IFeatures} message Features message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Features.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Features message from the specified reader or buffer.
         * @function decode
         * @memberof commands.Features
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {commands.Features} Features
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Features.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.commands.Features();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.analytics = reader.bool();
                        break;
                    }
                case 2: {
                        message.notifications = reader.bool();
                        break;
                    }
                case 3: {
                        message.darkMode = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Features message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof commands.Features
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {commands.Features} Features
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Features.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Features message.
         * @function verify
         * @memberof commands.Features
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Features.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.analytics != null && message.hasOwnProperty("analytics"))
                if (typeof message.analytics !== "boolean")
                    return "analytics: boolean expected";
            if (message.notifications != null && message.hasOwnProperty("notifications"))
                if (typeof message.notifications !== "boolean")
                    return "notifications: boolean expected";
            if (message.darkMode != null && message.hasOwnProperty("darkMode"))
                if (typeof message.darkMode !== "boolean")
                    return "darkMode: boolean expected";
            return null;
        };

        /**
         * Creates a Features message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof commands.Features
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {commands.Features} Features
         */
        Features.fromObject = function fromObject(object) {
            if (object instanceof $root.commands.Features)
                return object;
            let message = new $root.commands.Features();
            if (object.analytics != null)
                message.analytics = Boolean(object.analytics);
            if (object.notifications != null)
                message.notifications = Boolean(object.notifications);
            if (object.darkMode != null)
                message.darkMode = Boolean(object.darkMode);
            return message;
        };

        /**
         * Creates a plain object from a Features message. Also converts values to other types if specified.
         * @function toObject
         * @memberof commands.Features
         * @static
         * @param {commands.Features} message Features
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Features.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.analytics = false;
                object.notifications = false;
                object.darkMode = false;
            }
            if (message.analytics != null && message.hasOwnProperty("analytics"))
                object.analytics = message.analytics;
            if (message.notifications != null && message.hasOwnProperty("notifications"))
                object.notifications = message.notifications;
            if (message.darkMode != null && message.hasOwnProperty("darkMode"))
                object.darkMode = message.darkMode;
            return object;
        };

        /**
         * Converts this Features to JSON.
         * @function toJSON
         * @memberof commands.Features
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Features.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Features
         * @function getTypeUrl
         * @memberof commands.Features
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Features.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/commands.Features";
        };

        return Features;
    })();

    return commands;
})();

export { $root as default };
