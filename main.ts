namespace OKBit{
    import ADC = ADC128S102;
    import GPIO = PCA9555;

    /**
     * Initialize ADC IC
     */
    //% block ="ADC: initialization"
    export function AnalogInitial(): void{
        ADC.AnalogInitial();
    }

    /**
     * Read ADC channel and return value
     * @param ADC channel (0-7)
     * Return ADC value (0-4095)@12bits
     */
    //% block ="ADC: Read $channel pin"
    //% channel.min=0 channel.max=7
    export function AnalogRead(channel: number): number{
        return ADC.AnalogRead(channel);
    }

    /**
     * Read ADC channel and return voltage
     * @param ADC channel (0-7)
     * Return ADC voltage (0-3.3V)
     */
    //% block ="ADC: ReadVoltage $channel pin"
    //% channel.min=0 channel.max=7
    export function AnalogReadVolatage(channel: number):number{
        return ADC.AnalogReadVolatage(channel);
    }

    /**
     * Initialize GPIO IC
     * @param I2C address (0x20-0x27)
     */
    //% block ="GPIO: initialization at $address"
    //% address.min=0x20 address.max=0x27
    export function GpioInit(address: number): void{
        GPIO.init(address);
    }


}