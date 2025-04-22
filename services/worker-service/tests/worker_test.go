package tests

import (
	"testing"
	"os/exec"
)

func TestExecuteCommand(t *testing.T) {
	out, err := exec.Command("echo", "hello").Output()
	if err != nil {
		t.Errorf("Command failed: %v", err)
	}
	if string(out) != "hello\n" {
		t.Errorf("Expected 'hello', got '%s'", out)
	}
}
