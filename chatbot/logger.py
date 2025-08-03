import logging
import os
from logging.handlers import RotatingFileHandler

def setup_logger():
    """Setup simple logging configuration"""
    os.makedirs("logs", exist_ok=True)

    logger = logging.getLogger('social_blogging_api')
    logger.setLevel(logging.INFO)

    if logger.handlers:
        return logger

    formatter = logging.Formatter(
        '%(asctime)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )

    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(formatter)

    file_handler = RotatingFileHandler(
        'logs/app.log', 
        maxBytes=5*1024*1024,  
        backupCount=3
    )
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(formatter)

    logger.addHandler(console_handler)
    logger.addHandler(file_handler)
    
    return logger

logger = setup_logger()