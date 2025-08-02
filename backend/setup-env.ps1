# PowerShell script to set up environment variables
# Run this script from the backend directory

Write-Host "Setting up environment variables for backend..." -ForegroundColor Green

# Create .env file from template
if (Test-Path "env-template.txt") {
    Copy-Item "env-template.txt" ".env"
    Write-Host "Created .env file from template" -ForegroundColor Yellow
    Write-Host "Please edit .env file with your actual values before starting the server" -ForegroundColor Yellow
} else {
    Write-Host "env-template.txt not found!" -ForegroundColor Red
}

Write-Host "Setup complete!" -ForegroundColor Green 