package core

type ApicurioRegistryError struct {
	IsApicurioRegistryError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewApicurioRegistryError(code string, msg string, ctx *Context) *ApicurioRegistryError {
	return &ApicurioRegistryError{
		IsApicurioRegistryError: true,
		Sdk:              "ApicurioRegistry",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ApicurioRegistryError) Error() string {
	return e.Msg
}
