$base = "public/images"
$items = @(
  "hero-burger.svg|burger|#E8291E",
  "store.svg|store|#2F4A1E",
  "burgers/classic-lucas.svg|burger|#E8291E",
  "burgers/smash-duplo.svg|burger|#E8291E",
  "burgers/bacon-explosion.svg|burger|#E8291E",
  "burgers/veggie-garden.svg|burger|#2F4A1E",
  "combos/combo-duplo.svg|burger|#E8291E",
  "combos/combo-familia.svg|combo|#E8291E",
  "porcoes/fritas.svg|fries|#E8291E",
  "porcoes/cheddar-bacon.svg|fries|#E8291E",
  "bebidas/refri.svg|drink|#2F4A1E",
  "sobremesas/milkshake.svg|shake|#F2551C",
  "blog/burger-casa.svg|burger|#E8291E",
  "blog/batata-crocante.svg|fries|#F2551C",
  "blog/historia.svg|store|#2F4A1E"
)

foreach ($it in $items) {
  $parts = $it -split "\|"
  $rel = $parts[0]; $type = $parts[1]; $color = $parts[2]
  $art = "burger"
  if ($type -eq "porcao") { $art = "fries" }
  elseif ($type -eq "bebida") { $art = "drink" }
  elseif ($type -eq "sobremesa") { $art = "shake" }
  elseif ($type -eq "store") { $art = "store" }
  elseif ($type -eq "combo") { $art = "combo" }
  $artwork = switch ($art) {
    "burger" { '<circle cx="400" cy="250" r="70" fill="#E8291E"/><path d="M270 250 a130 55 0 0 1 260 0" fill="#D99A2A"/><rect x="250" y="300" width="300" height="28" rx="14" fill="#C88B2E"/><rect x="120" y="332" width="560" height="22" rx="11" fill="#B07A2E"/>' }
    "combo"  { '<circle cx="300" cy="300" r="58" fill="#E8291E"/><rect x="300" y="230" width="40" height="140" rx="20" fill="#E8291E"/><rect x="440" y="268" width="80" height="14" rx="7" fill="#D99A2A"/><rect x="430" y="288" width="100" height="14" rx="7" fill="#C88B2B"/>' }
    "fries"  { '<rect x="330" y="180" width="30" height="130" rx="8" fill="#D99A2A"/><rect x="360" y="160" width="30" height="150" rx="8" fill="#E0A83A"/><rect x="430" y="180" width="30" height="130" rx="8" fill="#C88B2B"/><path d="M280 330 h240 l-20 -40 h-200 z" fill="#E8291E"/>' }
    "drink"  { '<path d="M310 210 h120 l-10 220 a20 20 0 0 1 -20 20 h-60 a20 20 0 0 1 -20 -20 z" fill="#E8291E"/><rect x="330" y="150" width="70" height="14" rx="7" fill="#C21F16"/><line x1="400" y1="60" x2="400" y2="140" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round"/>' }
    "shake"  { '<path d="M330 240 h110 v160 a20 20 0 0 1 -20 20 h-70 a20 20 0 0 1 -20 -20 z" fill="#F2551C"/><path d="M340 200 a70 70 0 0 1 110 -20" fill="none" stroke="#F2551C" stroke-width="18" stroke-linecap="round"/><circle cx="470" cy="120" r="10" fill="#F2551C"/><circle cx="470" cy="90" r="8" fill="#F2551C"/>' }
    "store"  { '<rect x="230" y="230" width="340" height="170" rx="10" fill="#2F4A1E"/><path d="M250 230 L400 140 L550 230 Z" fill="#3d5c2c"/><rect x="360" y="300" width="80" height="100" rx="6" fill="#E5E5E5"/><rect x="250" y="275" width="70" height="50" fill="#1A1A1A"/>' }
    default  { '<circle cx="400" cy="250" r="70" fill="#E8291E"/>' }
  }
  $label = ($rel -split "/")[-1] -replace ".svg","" -replace "-"," "
  $path = Join-Path $base $rel
  New-Item -ItemType Directory -Force -Path (Split-Path $path) | Out-Null
  $svg = @"
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" role="img">
  <title>$label</title>
  <rect width="800" height="600" fill="#E5E5E5"/>
  <circle cx="400" cy="285" r="195" fill="#FFFFFF" stroke="#E8291E" stroke-width="4"/><circle cx="400" cy="285" r="160" fill="none" stroke="#E8291E" stroke-width="3" stroke-dasharray="10 12"/>
  $artwork
  <text x="400" y="490" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="$color" text-anchor="middle">$label</text>
</svg>
"@
  Set-Content -LiteralPath $path -Value $svg -Encoding UTF8
}
Write-Output "generated done"