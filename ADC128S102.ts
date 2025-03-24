namespace ADC128S102 {

    // ----------------------- ADC128S102 -----------------------

    let spi_mosi = DigitalPin.P15;
    let spi_miso = DigitalPin.P14;
    let spi_sck = DigitalPin.P13;
    let spi_cs = DigitalPin.P16;
    
    let ref_voltage = 3.3;

    //% blockId = ADC_INIT
    export function AnalogInitial(): void {
        pins.spiPins(spi_mosi, spi_miso, spi_sck);
        pins.spiFormat(8, 2);
        pins.spiFrequency(1000000);

        pins.digitalWritePin(spi_cs, 1);
    }

    //% blockId=ADC_READ
    export function AnalogRead(channel: number): number {

        let control = channel << 3;
        let high_byte: number;
        let low_byte: number;

        pins.digitalWritePin(spi_cs, 0);
        high_byte = pins.spiWrite(channel);
        low_byte = pins.spiWrite(0x00);
        pins.digitalWritePin(spi_cs, 1);

        return high_byte << 8 | low_byte;
    }

    //% blockId=ADC_READ_VOLTAGE
    export function AnalogReadVolatage(channel: number): number{
        let voltage = AnalogRead(channel)/4096*ref_voltage;
        return voltage
    }

}