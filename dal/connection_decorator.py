from typing import Callable, cast, Any, TypeVar
from .db import PGInterface

F = TypeVar("F", bound=Callable[..., Any])


def with_dbc(function: F) -> F:
    """
    Injects database connection to function and closes it after function is finished
    """

    def wrap(*args, **kwargs):
        if "dbc" in kwargs:
            return function(*args, **kwargs)
        with PGInterface() as dbc:
            return function(*args, dbc=dbc, **kwargs)

    wrap.__name__ = function.__name__
    return cast(F, wrap)
