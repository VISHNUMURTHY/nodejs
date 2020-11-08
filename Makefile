SRC = $(wildcard *.c) # if there is a source path, put that before the '*' and make sure to end with /
HDR = $(wildcard *.h) # same for this one
COMPILE = gcc -Warn -o main.o monster.c # -Warn shows warning

.PHONY: create
.PHONY: clean
.PHONY: run

create: ${SRC} ${HDR}
    ${COMPILE} ${SRC} ${HDR}

clean: # cleaning all output files for the project
    rm *.o