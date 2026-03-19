/**
 * Europe map with geographically-accurate simplified country outlines.
 * Coordinates projected from real-world lon/lat into an 800×700 viewBox.
 *
 * Projection (equirectangular, centered on Europe):
 *   x = 400 + (lon − 10) × 18
 *   y = 320 + (51 − lat) × 22
 */
export function EuropeMap({ className }: { className?: string }) {
  const cs = "#5a6cb8";
  const cf = "#3d4f94";

  /* Shared stroke attrs — 1px gap between countries via stroke */
  const sk = { stroke: "#2b3674", strokeWidth: 1.2, strokeLinejoin: "round" as const };

  /* Country fill helper */
  const p = (opacity: number) => ({ ...sk, fill: cf, fillOpacity: opacity });

  /* Germany centroid ≈ (10°E, 51°N) → (400, 320) */
  const gx = 400;
  const gy = 320;

  const arrows = [
    { x: 282, y: 395, cx: 295, cy: 315 },   // France
    { x: 195, y: 530, cx: 225, cy: 385 },   // Spain
    { x: 408, y: 495, cx: 370, cy: 385 },   // Italy
    { x: 345, y: 220, cx: 360, cy: 255 },   // Netherlands
    { x: 510, y: 268, cx: 465, cy: 258 },   // Poland
    { x: 460, y: 340, cx: 445, cy: 315 },   // Czech Rep
    { x: 468, y: 400, cx: 450, cy: 348 },   // Austria
    { x: 385, y: 190, cx: 390, cy: 240 },   // Denmark
    { x: 590, y: 395, cx: 520, cy: 335 },   // Romania
    { x: 318, y: 275, cx: 340, cy: 275 },   // Belgium
    { x: 500, y: 458, cx: 468, cy: 380 },   // Croatia
    { x: 420, y: 100, cx: 410, cy: 190 },   // Sweden
  ];

  return (
    <svg
      viewBox="0 0 800 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="de-grad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#f4b672" />
          <stop offset="100%" stopColor="#d0692a" />
        </linearGradient>
        <marker id="ah" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
          <path d="M0,0 L7,2.5 L0,5Z" fill="white" fillOpacity="0.8" />
        </marker>
      </defs>

      {/* ═══ NORWAY ═══
           Long narrow strip along Scandinavian west coast */}
      <path d={`
        M330 10 L340 5 350 12 358 30 362 55
        365 85 366 118 364 148 360 168
        354 182 348 188 342 185 338 172
        334 152 330 128 328 98 326 65 327 35
      `} {...p(0.38)} />

      {/* ═══ SWEDEN ═══
           East of Norway, wider in south, narrow in north */}
      <path d={`
        M365 8 L378 2 390 10 398 35 405 68
        410 100 414 135 416 158 414 175
        408 188 400 195 392 192 385 180
        380 160 376 132 372 100 368 68
        365 38
      `} {...p(0.42)} />

      {/* ═══ FINLAND ═══ */}
      <path d={`
        M448 2 L462 -5 472 8 478 38 482 72
        480 108 476 140 470 162 460 158
        452 138 446 108 443 72 444 38
      `} {...p(0.3)} />

      {/* ═══ DENMARK ═══
           Jutland peninsula + islands hint */}
      <path d={`
        M360 175 L368 170 376 172 382 180
        386 192 385 206 380 216 374 222
        368 220 364 212 360 200 358 188
      `} {...p(0.48)} />
      {/* Zealand island */}
      <path d="M390 198 L398 192 404 202 398 212 390 208Z" {...p(0.4)} />

      {/* ═══ GREAT BRITAIN ═══
           Scotland narrow top, England + Wales wider */}
      <path d={`
        M235 128 L242 118 250 122 258 135
        264 155 268 178 272 205 276 228
        278 248 274 265 268 278 260 285
        252 280 246 268 240 252 235 232
        230 208 227 182 226 155
      `} {...p(0.48)} />

      {/* ═══ IRELAND ═══ */}
      <path d={`
        M195 162 L208 150 220 158 225 175
        224 198 218 215 208 222 198 215
        192 200 190 180
      `} {...p(0.38)} />

      {/* ═══ NETHERLANDS ═══ */}
      <path d={`
        M335 212 L342 206 352 210 358 220
        356 234 348 242 338 240 332 228
      `} {...p(0.48)} />

      {/* ═══ BELGIUM ═══ */}
      <path d={`
        M308 248 L320 242 336 244 344 254
        340 266 328 272 314 268 306 258
      `} {...p(0.48)} />

      {/* ═══ LUXEMBOURG ═══ */}
      <path d="M330 270 L338 266 342 274 338 282 330 280Z" {...p(0.42)} />

      {/* ═══ FRANCE ═══
           Hexagonal shape with Atlantic coast W, Channel N,
           German border NE, Alps SE, Mediterranean S, Pyrenees SW */}
      <path d={`
        M245 275 L258 265 278 258 300 252 322 256
        336 262 344 270 350 285 356 305 358 328
        356 352 350 375 340 395 328 412 312 425
        294 432 275 435 258 428 242 418 230 402
        222 382 218 358 216 332 218 308 225 290
      `} {...p(0.52)} />

      {/* ═══ SPAIN ═══
           Blocky Iberian shape */}
      <path d={`
        M148 448 L168 432 195 422 225 418
        255 425 278 438 292 455 298 478
        296 505 286 528 272 548 252 560
        228 565 205 558 182 548 164 532
        152 510 146 485
      `} {...p(0.48)} />

      {/* ═══ PORTUGAL ═══ */}
      <path d={`
        M128 452 L146 440 152 460 152 488
        150 515 144 532 134 525 128 498 126 472
      `} {...p(0.38)} />

      {/* ════════════════════════════════════════
          ═══  G E R M A N Y  (highlighted)  ═══
          Traced from actual borders with ~35 points.
          North Sea coast → Danish border → Baltic coast →
          Polish border (Oder) → Czech border (Erzgebirge) →
          Austrian border → Swiss/Lake Constance →
          French border (Rhine) → Benelux borders
          ════════════════════════════════════════ */}
      <path
        d={`
          M348 230 L356 224 366 220 378 216
          390 215 402 218 416 225 430 230
          445 236 458 242 466 252
          472 264 474 278 472 294
          468 308 462 320 456 332
          448 344 440 355 432 364
          422 372 412 378 400 382
          388 380 376 375 366 368
          358 358 352 346 346 332
          342 316 340 298 340 278
          342 258 346 242
        `}
        fill="url(#de-grad)"
        stroke="#f0a55c"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* ═══ SWITZERLAND ═══ */}
      <path d={`
        M342 385 L355 378 368 380 378 388
        375 400 362 405 348 402 340 395
      `} {...p(0.52)} />

      {/* ═══ AUSTRIA ═══
           Long east-west band south of Germany/Czech Rep */}
      <path d={`
        M400 386 L415 378 432 380 450 385
        465 392 475 402 470 415 458 422
        442 425 425 420 410 412 400 402
      `} {...p(0.52)} />

      {/* ═══ ITALY ═══
           Boot: Po valley N, peninsula SE → SW, toe → heel */}
      <path d={`
        M358 410 L372 402 388 408 398 418
        405 435 410 455 412 478 408 500
        402 518 394 535 384 548 375 555
        368 548 365 532 368 512 372 490
        374 468 375 448 370 430 362 418
      `} {...p(0.48)} />
      {/* Sicily */}
      <path d={`
        M378 562 L392 554 405 562 400 575
        385 578
      `} {...p(0.38)} />
      {/* Sardinia */}
      <path d="M338 475 L348 465 354 478 350 498 340 495Z" {...p(0.35)} />
      {/* Corsica */}
      <path d="M345 445 L352 435 356 452 352 465 346 460Z" {...p(0.35)} />

      {/* ═══ CZECH REPUBLIC ═══
           Distinctive diamond/shield shape */}
      <path d={`
        M430 318 L445 310 462 315 472 328
        475 342 468 355 452 362 438 358
        425 348 420 335
      `} {...p(0.48)} />

      {/* ═══ POLAND ═══
           Broad shape, Oder river on west, Bug river on east */}
      <path d={`
        M475 232 L492 225 512 228 530 238
        540 255 542 275 538 298 530 315
        518 325 502 330 485 325 472 315
        465 300 462 280 464 258
      `} {...p(0.52)} />

      {/* ═══ SLOVAKIA ═══ */}
      <path d={`
        M470 348 L488 340 508 345 518 358
        512 372 498 380 480 378 468 365
      `} {...p(0.45)} />

      {/* ═══ HUNGARY ═══ */}
      <path d={`
        M482 382 L502 374 525 378 540 392
        538 410 525 422 505 428 488 422
        478 408
      `} {...p(0.48)} />

      {/* ═══ SLOVENIA ═══ */}
      <path d="M440 425 L455 418 470 424 468 438 455 442 442 435Z" {...p(0.42)} />

      {/* ═══ CROATIA ═══
           L-shaped: Slavonia E, coast curving S */}
      <path d={`
        M462 440 L480 432 500 438 515 452
        510 470 498 482 482 488 468 478
        455 462
      `} {...p(0.45)} />

      {/* ═══ BOSNIA ═══ */}
      <path d={`
        M492 458 L508 448 522 455 525 472
        515 485 500 482
      `} {...p(0.38)} />

      {/* ═══ SERBIA ═══ */}
      <path d={`
        M525 428 L542 420 558 428 564 448
        558 468 545 482 530 478 522 462
      `} {...p(0.42)} />

      {/* ═══ ROMANIA ═══
           Carpathian arc shape */}
      <path d={`
        M548 370 L572 358 598 365 618 382
        622 405 612 428 595 440 575 445
        555 438 542 422 538 400
      `} {...p(0.48)} />

      {/* ═══ BULGARIA ═══ */}
      <path d={`
        M558 448 L578 438 600 445 610 465
        602 482 585 492 565 488 555 472
      `} {...p(0.4)} />

      {/* ═══ GREECE ═══ */}
      <path d={`
        M545 498 L562 488 580 495 585 518
        578 538 562 548 548 542 540 522
      `} {...p(0.35)} />

      {/* ═══ BALTICS ═══ */}
      {/* Estonia */}
      <path d="M490 130 L508 122 522 132 520 150 505 158 488 148Z" {...p(0.3)} />
      {/* Latvia */}
      <path d="M488 155 L506 145 524 155 522 175 508 185 486 175Z" {...p(0.32)} />
      {/* Lithuania */}
      <path d="M486 182 L505 172 524 182 520 205 505 215 484 202Z" {...p(0.35)} />

      {/* ═══ BELARUS ═══ */}
      <path d={`
        M528 208 L552 195 580 202 590 225
        585 255 568 270 545 268 530 248
      `} {...p(0.32)} />

      {/* ═══ UKRAINE ═══ */}
      <path d={`
        M572 272 L600 258 635 265 662 288
        668 320 658 352 638 368 612 365
        585 355 565 340 555 315
      `} {...p(0.3)} />

      {/* ═══ ALBANIA / N.MACEDONIA ═══ */}
      <path d="M535 492 L548 485 558 495 555 510 545 515 533 505Z" {...p(0.32)} />

      {/* ═══ TURKEY hint ═══ */}
      <path d={`
        M602 500 L622 490 648 498 665 515
        658 530 638 535 615 525
      `} {...p(0.28)} />

      {/* ═══════════ CURVED ARROWS ═══════════ */}
      {arrows.map((a, i) => (
        <path
          key={i}
          d={`M${gx},${gy} Q${a.cx},${a.cy} ${a.x},${a.y}`}
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.7"
          fill="none"
          markerEnd="url(#ah)"
        />
      ))}
    </svg>
  );
}
