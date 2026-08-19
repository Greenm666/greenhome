param(
    [int]$Port = 8080
)

$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path

function Get-MimeType {
    param([string]$extension)
    switch ($extension.ToLower()) {
        ".html"  { return "text/html; charset=utf-8" }
        ".css"   { return "text/css; charset=utf-8" }
        ".js"    { return "application/javascript; charset=utf-8" }
        ".json"  { return "application/json; charset=utf-8" }
        ".svg"   { return "image/svg+xml" }
        ".ico"   { return "image/x-icon" }
        ".png"   { return "image/png" }
        ".jpg"   { return "image/jpeg" }
        ".jpeg"  { return "image/jpeg" }
        ".gif"   { return "image/gif" }
        ".webp"  { return "image/webp" }
        ".txt"   { return "text/plain; charset=utf-8" }
        ".woff"  { return "font/woff" }
        ".woff2" { return "font/woff2" }
        default  { return "application/octet-stream" }
    }
}

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")

try {
    $listener.Start()

    Write-Host ""
    Write-Host "========================================"
    Write-Host "  Food Nutrition Search - Local Server"
    Write-Host "========================================"
    Write-Host ""
    Write-Host "  URL: http://localhost:$Port/"
    Write-Host "  Dir: $projectDir"
    Write-Host "  Press Ctrl+C to stop"
    Write-Host ""
    Write-Host "----------------------------------------"
    Write-Host ""

    while ($listener.IsListening) {
        $ctx = $listener.GetContext()
        $req = $ctx.Request
        $resp = $ctx.Response

        $rel = $req.Url.AbsolutePath
        if ($rel -eq "/") {
            $rel = "/index.html"
        }

        $filePath = Join-Path $projectDir $rel.TrimStart("/")

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath)
            $resp.ContentType = Get-MimeType -extension $ext
            $resp.ContentLength64 = $bytes.Length
            $resp.OutputStream.Write($bytes, 0, $bytes.Length)
            $code = 200
        } else {
            $resp.StatusCode = 404
            $nfBytes = [System.Text.Encoding]::UTF8.GetBytes("404 - Not Found: $rel")
            $resp.ContentType = "text/plain; charset=utf-8"
            $resp.ContentLength64 = $nfBytes.Length
            $resp.OutputStream.Write($nfBytes, 0, $nfBytes.Length)
            $code = 404
        }

        $resp.Close()

        $ts = Get-Date -Format "HH:mm:ss"
        $ip = $req.RemoteEndPoint.Address
        Write-Host "$ts  [$code]  $ip  $rel"
    }
}
catch {
    Write-Host ""
    Write-Host "Server Error: $_" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
}
finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    $listener.Close()
    Write-Host ""
    Write-Host "Server stopped." -ForegroundColor Yellow
}