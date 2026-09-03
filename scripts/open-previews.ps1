# Open English + Chinese local profile previews together from temp/preview/.
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Start-Process (Join-Path $root "temp\preview\preview-profile.html")
Start-Process (Join-Path $root "temp\preview\preview-profile.zh.html")
