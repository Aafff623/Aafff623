# Open English + Chinese local profile previews together.
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Start-Process (Join-Path $root "preview-profile.html")
Start-Process (Join-Path $root "preview-profile.zh.html")
