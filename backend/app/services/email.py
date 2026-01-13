from typing import Any

def send_verification_email(email_to: str, token: str) -> None:
    """
    Mock email sending. In production, use SMTP or an email API like SendGrid.
    """
    print(f"==========================================")
    print(f"EMAIL TO: {email_to}")
    print(f"SUBJECT: Verify your account")
    print(f"VERIFICATION LINK: http://localhost:8000/auth/verify?token={token}")
    print(f"==========================================")

def send_password_reset_email(email_to: str, token: str) -> None:
    print(f"==========================================")
    print(f"EMAIL TO: {email_to}")
    print(f"SUBJECT: Reset your password")
    print(f"RESET LINK: http://localhost:8000/auth/reset-password?token={token}")
    print(f"==========================================")
