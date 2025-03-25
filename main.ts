namespace OKBit{
    import ADC = ADC128S102;
    import GPIO = PCA9555;


    //% group="ADC"
    /**
     * Initialize ADC IC
     */
    //% block="ADC: initialization"
    export function AnalogInitial(): void{
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
    export function AnalogRead(channel: number): number{
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
    export function AnalogReadVoltage(channel:number):number{
        return ADC.AnalogReadVoltage(channel);
    }

    //% group="GPIO"
    /**
     * Initialize GPIO IC
     * 
     * @param I2C address (0x20-0x27)
     */
    //% block="GPIO: initialization at $address"
    export function GpioInit(address: GPIO.Address):void{
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
    export function GpioMode(pin:number,mode:GPIO.PinMode):void{
        GPIO.config_single_pin(pin,mode);
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
    export function GpioWrite(pin:number,value:GPIO.PinOutput):void{
        GPIO.write_single_pin(pin,value);
    }
    
    //% group="GPIO"
    /**
     * @param pin pin number (0-15)
     * 
     * @returns -1 if OUTPUT mode pin 
     */
    //% block="GPIO: Read $pin pin"
    //% pin.min=0 pin.max=15
    export function GpioRead(pin:number):number{
        return GPIO.read_single_pin(pin);
    }


}