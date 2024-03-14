package Router

import "github.com/labstack/echo/v4"

func IndexHanddler(c echo.Context) error {
	return c.File("")
}
