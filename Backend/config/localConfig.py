import os
from .settings import BASE_DIR

FRONTEND_DIR = os.path.join(os.path.dirname(BASE_DIR), 'Frontend')

STATICFILES_DIRS = (
    os.path.join(FRONTEND_DIR, 'dist'),
)
