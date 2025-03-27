
//% block="OKBit: ADC"
namespace OKBit_ADC{

    import ADC = ADC128S102;

    //% group="ADC"
    /**
     * Initialize ADC IC
     */
    //% block="ADC: Initialization"
    export function AnalogInitial(): void {
        ADC.AnalogInitial();
    }

    //% group="ADC"
    /**
     * Read ADC channel and return value
     * 
     * @param ADC channel (0-7)
     * 
     * Return ADC value (0-4095)@12bits
     */
    //% block="ADC: Read $channel pin"
    //% channel.min=0 channel.max=7
    export function AnalogRead(channel: number): number {
        return ADC.AnalogRead(channel);
    }

    //% group="ADC"
    /**
     * Read ADC channel and return voltage
     * 
     * @param ADC channel (0-7)
     * 
     * @returns ADC voltage (0-3.3V)
     */
    //% block="ADC: ReadVoltage $channel pin"
    //% channel.min=0 channel.max=7
    export function AnalogReadVoltage(channel: number): number {
        return ADC.AnalogReadVoltage(channel);
    }
}

//% block="OKBit: GPIO"
namespace OKBit_GPIO{

    import GPIO = PCA9555;
    //% group="GPIO"
    /**
     * Initialize GPIO IC
     * 
     * @param I2C address (0x20-0x27)
     */
    //% block="GPIO: Initialization at $address"
    export function GpioInit(address: GPIO.Address): void {
        GPIO.init(address);
    }

    //% group="GPIO"
    /**
     * Set single pin as INPUT or OUTPUT
     * 
     * @param pin pin number (0-15)
     * @param mode GPIO.PinMode.Input or GPIO.PinMode.Output
     */
    //% block="GPIO: Set $pin pin as $mode"
    //% pin.min=0 pin.max=15
    export function GpioMode(pin: number, mode: GPIO.PinMode): void {
        GPIO.config_single_pin(pin, mode);
    }

    //% group="GPIO"
    /**
     * Write single pin as HIGH or LOW
     * 
     * @param pin pin number (0-15)
     * @param value PinOutput.High or PinOutput.Low
     */
    //% block="GPIO: Write $pin pin as $value"
    //% pin.min=0 pin.max=15
    export function GpioWrite(pin: number, value: GPIO.PinOutput): void {
        GPIO.write_single_pin(pin, value);
    }

    //% group="GPIO"
    /**
     * @param pin pin number (0-15)
     */
    //% block="GPIO: Read $pin pin"
    //% pin.min=0 pin.max=15
    export function GpioRead(pin: number): number {
        return GPIO.read_single_pin(pin);
    }
}

//% block="OKBit: PWM"
namespace OKBit_PWM{

    import PWM = PCA9685;

    //% group="PWM"
    /**
     * Initialize the PWM module
     * @param addr I2C address (usually 0x40)
     */
    //% block="PWM: Initialize at address %addr"
    export function init(addr: PWM.ADDR = PWM.ADDR.ADDR_0x40): void {
        PWM.init(addr)
    }

    //% group="PWM"
    /**
     * Set PWM frequency in Hz (default is 50Hz for servos)
     * @param freq frequency in Hz
     */
    //% block="PWM: Set frequency $freq Hz"
    export function setPWMFreq(freq: number = 50): void {
        PWM.setPWMFreq(freq);
    }

    //% group="PWM"
    /**
     * Set PWM pulse for a channel
     * @param channel 0–7
     * @param on 0–4095
     * @param off 0–4095
     */
    //% block="PWM: Set output channel $channel|on $on|off $off"
    //% channel.min=0 channel.max=15
    //% on.min=0 on.max=4095
    //% off.min=0 off.max=4095
    export function SetPWM(channel: number, on: number, off: number): void {
        PWM.setPWM(channel, on, off);
    }

    //% group="PWM"
    /**
     * Set servo angle (0–180°)
     * @param channel 0–7
     * @param angle 0–180°
     */
    //% block="PWM: Set Servo $channel|angle $angle"
    //% channel.min=0 channel.max=15
    //% angle.min=0 angle.max=180
    export function SetServoAngle(channel: number, angle: number): void {
        const pulse = Math.map(angle, 0, 180, 102, 512) // ~0.5ms to 2.5ms pulse @50Hz
        PWM.setPWM(channel, 0, pulse)
    }

    export enum MotorDirection {
        Forward = 0,
        Backward
    }

    //% group="PWM"
    /**
     * Set motor speed (0–4095)
     * @param channel 0–3
     * @param speed 0–4095
     * @param direction MotorDirection.Forward/Backward
     */
    //% block="PWM: Set Motor $channel|speed $speed|direction $direction"
    //% channel.min=0 channel.max=3
    //% speed.min=0 speed.max=4095
    export function SetMortorSpeed(channel: number, speed: number, direction: MotorDirection = MotorDirection.Forward): void {
        let channelA, channelB
        switch (channel) {
            case 0: channelA = 15; channelB = 14; break;
            case 1: channelA = 13; channelB = 12; break;
            case 2: channelA = 11; channelB = 10; break;
            case 3: channelA = 9; channelB = 8; break;
        }

        SetPWM(channelA, 0, direction == MotorDirection.Forward ? 0 : speed);
        SetPWM(channelB, 0, direction == MotorDirection.Forward ? speed : 0);
    }
}
