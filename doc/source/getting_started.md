# Getting started guide

![STM32H7 Renode Reference Platform hardware](img/renode-reference-platform-top.png)

This manual will guide you through the initial setup of the open hardware STM32H7 Renode Reference Platform.

For the board layout and the location of the connectors and buttons mentioned here, see the [Board overview](board_overview.md) chapter. For background on the Zephyr target used below, see the [Zephyr documentation](https://docs.zephyrproject.org/latest/boards/antmicro/stm32h7_renode_reference_board/doc/index.html).

## Collect the hardware

* The STM32H7 Renode Reference Platform board
* A host PC running Linux (the instructions in this guide were verified with a Debian-based system)
* USB-C cable to connect PC with the STM32H7 Renode Reference Platform board

## Connect the board

Plug the USB-C cable into the `USB-C DEBUG` port and connect the other end to your PC. The board powers up through this port. This single connection powers the board and provides flashing, debugging and the debug console at the same time.

![USB-C DEBUG](img/usb-debug.png)

Confirm that the PC detects the board's FTDI bridge with `lsusb`. The output must contain:

```
Bus 001 Device 008: ID 0403:6011 Future Technology Devices International, Ltd FT4232H Quad HS USB-UART/FIFO IC
```

## Set up the demo workspace and flash the board

The demo application lives in the [stm32h7-renode-reference-platform-zephyr](https://github.com/antmicro/stm32h7-renode-reference-platform-zephyr) repository. 
It allows you to experiment with basic functionalities of the board.

Clone the demo repository:

```
git clone https://github.com/antmicro/stm32h7-renode-reference-platform-zephyr
```

Then follow the `Quick start` instructions in [the demo's README](https://github.com/antmicro/stm32h7-renode-reference-platform-zephyr#quick-start) to set up the `West` build management tool together with Zephyr requirements, and to flash the board with the built `stm32h7_renode_reference_board` target.

## Open the debug console

The Zephyr example provides a console log that allows the user to easily identify if the firmware is flashed correctly into the MCU. 
The STM32H7 Renode Reference Platform provides console access on the serial port. We suggest using `picocom` for console monitoring while flashing the device.

First, you need to identify the proper COM port. Check the detected USB devices in `dmesg`:

```
$ sudo dmesg | grep FTDI
[90522.076308] usb 1-4: Manufacturer: FTDI
[90522.133565] usbserial: USB Serial support registered for FTDI USB Serial Device
[90522.133630] ftdi_sio 1-4:1.0: FTDI USB Serial Device converter detected
[90522.133882] usb 1-4: FTDI USB Serial Device converter now attached to ttyUSB0
[90522.133932] ftdi_sio 1-4:1.1: FTDI USB Serial Device converter detected
[90522.134117] usb 1-4: FTDI USB Serial Device converter now attached to ttyUSB1
[90522.134175] ftdi_sio 1-4:1.2: FTDI USB Serial Device converter detected
[90522.134402] usb 1-4: FTDI USB Serial Device converter now attached to ttyUSB2
[90522.134440] ftdi_sio 1-4:1.3: FTDI USB Serial Device converter detected
[90522.134630] usb 1-4: FTDI USB Serial Device converter now attached to ttyUSB3

```

In the case presented above, the `ftdi_sio 1-4:1.2:` device is attached to `ttyUSB2`. To monitor the console, use:

```
sudo picocom -b 115200 /dev/ttyUSB2
```

After connecting to the console and resetting the device, you should see a log similar to the following:

```
$ sudo picocom -b 115200 /dev/ttyUSB2

[00:00:00.050,000] <inf> phy_mii: PHY (0) ID 7C131
[00:00:00.122,000] <inf> LSM6DSO: Initialize device lsm6dso@6a
[00:00:00.122,000] <inf> LSM6DSO: chip id 0x6c
*** Booting STM32H7 Renode Platform Demo c605ea46e15f ***
demo:~$
```

## Blink the LEDs

Enter the following commands in the demo shell:

```
led blink pwmleds 0 500
led blink pwmleds 1 500
led blink pwmleds 2 500
```

The three green LEDs `D1`-`D3` blink with a 500 ms period.

## Running the digital twin in Renode

A digital twin of the board is available in the [Renode](https://renode.io) simulation framework. It models the `STM32H753` MCU together with the on-board peripherals.

The twin is published as part of Zephyr: the [`stm32h7_renode_reference_board` target](https://github.com/zephyrproject-rtos/zephyr/tree/main/boards/antmicro/stm32h7_renode_reference_board) ships the Renode platform description (`stm32h7_renode_reference_board.repl`) and the Renode script (`stm32h7_renode_reference_board.resc`) in its `support` directory. The script creates the simulated board, loads the demo binary and opens a terminal on the simulated USART2 console.

Because Renode is the default emulator of this Zephyr target, the demo built in [Flash the board](#flash-the-board) runs on the digital twin with one command, from the same directory:

```
west simulate
```