namespace OKbit{

// ----------------------- ADC128S102 -----------------------

    let spi_mosi = 15, spi_miso =  14, spi_sck = 13, spi_cs = 16

    //% blockId = ADC_INIT
    //% block="AnalogInitial"
    export function AnalogInitial(): void{
        pins.spiPins(spi_mosi,spi_miso,spi_sck);
        pins.spiFormat(8,2);
        pins.spiFrequency(16000000);
    }

    //% blockId = ADC_READ
    //% block="AnalogRead $channel"
    //% channel.min=0 channel.max=7
    export function AnalogRead(channel : number): int16{

        let control = pins.createBuffer(1)
        control[0] = channel<<3

        pins.digitalWritePin(spi_cs,0)

        let high_buffer = pins.createBuffer(1)
        let low_buffer = pins.createBuffer(1)
        pins.spiTransfer(control,high_buffer)
        pins.spiTransfer(null, low_buffer)

        pins.digitalWritePin(spi_cs, 1)
        return (high_buffer[0]<<8) | low_buffer[0]
    }

}