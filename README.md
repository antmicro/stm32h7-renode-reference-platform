# STM32H753 Renode Reference Platform

Copyright (c) 2026 [Antmicro](https://www.antmicro.com)

![Board photo](img/stm32h7-renode-reference-platform-photo.png)

## Overview

This project contains open hardware design files for an STM32H753 Renode Reference Platform. 
The board includes a high-performance 32-bit STM32H753 MCU and a group of sensors integrated into a development kit form factor. 
A digital twin of the board is represented in the [Renode](https://github.com/renode/renode) simulation framework, allowing users to experiment and learn how to integrate Renode into the development process.

## Key features

* Powered via USB-C
* Dedicated debug/flashing USB-C port
* 100Mbit/s Ethernet
* DRP USB-C 
* 10-axis IMU
* Power consumption meter
* Temperature sensor
* Light intensity sensor
* 2x CAN Bus terminal
* 1Gb QSPI Flash external memory
* QWIIC expansion connector

## Project structure

The main directory contains KiCad PCB project files, the LICENSE, and this README, and the img directory contains graphics for this README.

## Licensing

This project is published under the [Apache-2.0](LICENSE) license.
