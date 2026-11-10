param(
    [string]$RepoPath = ".",
    [int]$SizeThresholdMB = 100
)

$ErrorActionPreference = "Stop"

$ThresholdBytes = $SizeThresholdMB * 1MB

Write-Host ""
Write-Host "Git Large File Audit"
Write-Host "Repository: $RepoPath"
Write-Host "Threshold: $SizeThresholdMB MB"
Write-Host ""

Set-Location $RepoPath

if (-not (Test-Path ".git")) {
    throw "Not a Git repository: $RepoPath"
}

$results = git rev-list --objects --all |
    git cat-file --batch-check="%(objectsize) %(objectname) %(rest)" |
    ForEach-Object {
        $parts = $_ -split ' ', 3
        if ($parts.Count -ge 2) {
            try {
                $size = [int64]$parts[0]
                if ($size -ge $ThresholdBytes) {
                    [PSCustomObject]@{
                        SizeMB = [Math]::Round($size / 1MB, 2)
                        SizeBytes = $size
                        SHA = $parts[1]
                        Path = if ($parts.Count -eq 3) { $parts[2] } else { "" }
                    }
                }
            } catch {}
        }
    }

if ($results) {
    $results |
        Sort-Object SizeBytes -Descending |
        Format-Table SizeMB, SHA, Path -AutoSize
} else {
    Write-Host "No files found above $SizeThresholdMB MB."
}

Write-Host ""
Write-Host "Repository statistics:"
git count-objects -vH