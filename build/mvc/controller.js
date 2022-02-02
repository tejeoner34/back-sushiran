"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postReservationController = exports.getReservations = void 0;
var mail_1 = require("../adapters/mail");
var model_1 = require("./model");
function getReservations(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var timeArray, index, availableTimes, finalArray, reservation, i, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timeArray = [
                        '11:00',
                        '11:30',
                        '12:00',
                        '12:30',
                        '13:00',
                        '13:30',
                        '14:00',
                        '14:30',
                        '15:00',
                        '15:30',
                        '16:00',
                        '16:30',
                        '17:00',
                        '17:30',
                        '18:00',
                        '18:30',
                        '19:00',
                        '19:30',
                        '20:00',
                        '20:30',
                        '21:00',
                        '21:30',
                        '22:00',
                        '22:30',
                        '23:00',
                        '23:30'
                    ];
                    index = timeArray.indexOf(req.body.time);
                    availableTimes = timeArray.splice(index - 2, 4);
                    finalArray = [];
                    return [4 /*yield*/, (0, model_1.getReservationsModel)(req.body.date, req.body.number, req.body.time)];
                case 1:
                    reservation = _a.sent();
                    if (reservation === null) {
                        for (i = 0; i < availableTimes.length; i++) {
                            finalArray.push({ time: availableTimes[i], isAvailable: true });
                        }
                        res.json(finalArray);
                    }
                    else {
                        _loop_1 = function (i) {
                            var isInArray = reservation === null || reservation === void 0 ? void 0 : reservation.reservations.find(function (element) { return element.time === availableTimes[i] && element.numberOfPeople === req.body.number; });
                            if (isInArray === undefined) {
                                finalArray.push({ time: availableTimes[i], isAvailable: true });
                            }
                            else {
                                finalArray.push({ time: availableTimes[i], isAvailable: false });
                            }
                        };
                        for (i = 0; i < availableTimes.length; i++) {
                            _loop_1(i);
                        }
                        res.json(finalArray);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getReservations = getReservations;
function postReservationController(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, people, time, date;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, people = _a.people, time = _a.time, date = _a.date;
                    return [4 /*yield*/, (0, model_1.postReservationModel)(req.body)];
                case 1:
                    _b.sent();
                    (0, mail_1.sendMail)(email, 'Reservation details', "<h2>Details of your reservation</h2>\n    <ul>\n    <li>Time: ".concat(time, "</li>\n    <li>People: ").concat(people, "</li>\n    <li>Date: ").concat(date, "</li>\n    </ul>"));
                    res.json("ok");
                    return [2 /*return*/];
            }
        });
    });
}
exports.postReservationController = postReservationController;
