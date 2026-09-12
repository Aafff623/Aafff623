# Start the canonical local preview server and open the showcase and the editor (editor defaults to Chinese).
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$previewBase = "http://127.0.0.1:3000"
$serverReady = $false

try {
  $response = Invoke-WebRequest -Uri "$previewBase/" -UseBasicParsing -TimeoutSec 2
  $serverReady = $response.StatusCode -eq 200
} catch {
  $serverReady = $false
}

if (-not $serverReady) {
  Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory $root -WindowStyle Hidden
  $deadline = (Get-Date).AddSeconds(5)
  do {
    Start-Sleep -Milliseconds 150
    try {
      $response = Invoke-WebRequest -Uri "$previewBase/" -UseBasicParsing -TimeoutSec 1
      $serverReady = $response.StatusCode -eq 200
    } catch {
      $serverReady = $false
    }
  } while (-not $serverReady -and (Get-Date) -lt $deadline)
}

if (-not $serverReady) {
  throw "Preview server did not start at $previewBase"
}

Start-Process "$previewBase/"
Start-Process "$previewBase/edit"
