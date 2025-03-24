namespace OKBit{
    export import ADC = ADC128S102;
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
     * @returns ADC value (0-4095)@12bits
     */
    //% block ="ADC: Read"
    //% channel.min=0 channel.max=7
    export function AnalogRead(channel: number): number{
        return ADC.AnalogRead(channel);
    }

    /**
     * Read ADC channel and return voltage
     * @param ADC channel (0-7)
     * @returns ADC voltage (0-3.3V)
     */
    //% block ="ADC: ReadVoltage"
    //% channel.min=0 channel.max=7
    export function AnalogReadVolatage(channel: number):number{
        return ADC.AnalogReadVolatage(channel);
    }



}