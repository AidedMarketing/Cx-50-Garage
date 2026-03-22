/* ─── CX-50 Garage — Reference Data ───────────────────────────
   Full owner guide content: specs, hidden tricks, Miami tips,
   maintenance schedule, and quick reference data.
──────────────────────────────────────────────────────────────── */

const ReferenceData = {

  quickSpecs: [
    { label: 'Engine',          value: '2.5L SkyActiv-G Turbo' },
    { label: 'Horsepower',      value: '256 hp (premium) / 227 hp (regular)' },
    { label: 'Torque',          value: '320 lb-ft' },
    { label: 'Transmission',    value: '6-speed automatic' },
    { label: 'Drivetrain',      value: 'i-Activ AWD' },
    { label: 'Fuel Type',       value: 'Premium 91+ octane (recommended)' },
    { label: 'Fuel Tank',       value: '14.8 gallons' },
    { label: 'Oil Spec',        value: '0W-20 Full Synthetic' },
    { label: 'Oil Capacity',    value: '4.8 qt (with filter)' },
    { label: 'Tire Pressure',   value: '35 PSI (front & rear)' },
    { label: 'Wiper — Driver',  value: '26" (J-hook connector)' },
    { label: 'Wiper — Pass.',   value: '16" (J-hook connector)' },
    { label: 'Towing Capacity', value: '3,500 lb (w/ trailer package)' },
    { label: 'Cargo (seats up)',value: '31.4 cu-ft' },
    { label: 'Cargo (seats down)', value: '56.3 cu-ft' },
  ],

  hiddenTricks: [
    {
      title: 'Disable Auto Start-Stop',
      tip: '<strong>Hold</strong> the i-Stop button (next to the start button) for 2–3 seconds until it stops blinking. This disables Auto Stop permanently for that drive cycle. You must repeat each time you start the car — there is no permanent disable without an aftermarket solution.',
    },
    {
      title: 'Wiper Tab Release Trick',
      tip: 'The CX-50 uses a J-hook wiper connector. To remove: lift arm, rotate blade 90° perpendicular, then <strong>press the small plastic tab on the underside</strong> of the connector while sliding the blade toward the hook tip — both actions simultaneously. Forcing it without the tab will snap the clip.',
    },
    {
      title: 'CarPlay Wireless Upgrade',
      tip: 'Stock CarPlay is wired only. Plug a Carlinkit or AAWireless adapter into the USB-A port behind the center console storage lid. Takes under a minute, no settings change needed. Works with both iOS and Android Auto versions.',
    },
    {
      title: 'Driver Attention Alert Reset',
      tip: 'If the coffee cup alert keeps triggering on familiar routes, you can temporarily disable it via Settings → Vehicle → Driver Monitoring. It resets each ignition cycle.',
    },
    {
      title: 'Sport Mode + Manual Shift',
      tip: 'Shift to Sport Mode via the drive selector, then use the paddle shifters or the selector for manual control. The Turbo responds noticeably with sharper throttle mapping and holds gears longer — best for highway on-ramps.',
    },
    {
      title: 'Head-Up Display Calibration',
      tip: 'If the HUD angle looks off after getting in, adjust via Settings → Driver Personalization. The system supports multiple driver profiles, so set yours once and it auto-loads with the seat/mirror memory.',
    },
    {
      title: 'Rear Camera Wash',
      tip: 'The CX-50 Meridian Edition includes a rear camera washer. It activates automatically when you engage reverse and the windshield washer is triggered. You can also trigger it manually via the camera view controls.',
    },
    {
      title: 'Fuel Octane Impact',
      tip: 'The engine is tuned for premium but will run on regular — it just derates to 227 hp and adjusts timing. For spirited driving or hot Miami days, premium is worth it for the full 256 hp and better knock resistance under boost.',
    },
    {
      title: 'i-Activ AWD Behavior',
      tip: 'The AWD system predictively shifts torque before slip occurs using road surface sensors, steering angle, and wiper speed. It does not require driver input. In dry Miami conditions it operates mostly FWD; activates immediately in rain.',
    },
    {
      title: 'Turbo Bypass Valve Sound',
      tip: 'The stock airbox muffles the turbo bypass valve (pssh sound) intentionally. A short-ram intake like the CorkSport significantly opens this up without any tune or CEL. Most noticeable when lifting off the throttle under boost.',
    },
  ],

  miamiTips: [
    {
      title: 'Heat & Engine Bay',
      tip: 'Miami\'s sustained heat accelerates fluid degradation. Check coolant, brake fluid, and power steering fluid every 6 months — not just per the standard schedule. The turbo heat-soaks quickly in stop-and-go; let it idle 60 seconds before shutdown after hard driving.',
    },
    {
      title: 'Tint Laws (Florida)',
      tip: 'Florida allows: Front side windows 28%+ VLT, rear side and rear window any tint level. No restrictions on darkness but metallic/mirrored tints are banned. Ceramic tint strongly recommended — significantly reduces cabin temp vs. dyed film.',
    },
    {
      title: 'Salt Air & Undercarriage',
      tip: 'If you drive near Brickell, South Beach, or cross causeways regularly, road salt and sea air accelerate undercarriage corrosion. Spray undercoating and annual rinse with fresh water helps extend longevity.',
    },
    {
      title: 'Rainy Season (June–November)',
      tip: 'Miami rain season means standing water, hydroplaning risk, and fogged windows. Keep rain-repellent (Rain-X) on windshield, verify wiper quality before June, and ensure tires are above 4/32" tread. Tire pressure drops ~1 PSI per 10°F temp drop — check monthly.',
    },
    {
      title: 'Parking & Sun Damage',
      tip: 'UV intensity in Miami is extreme. Always use a windshield sunshade — it protects the dashboard from cracking and reduces cabin temp by up to 40°F. Ceramic tint on windows dramatically reduces UV transmission and interior fade.',
    },
    {
      title: 'Bug Splatter & Paint',
      tip: 'Miami highways — especially I-95 and 836 — produce heavy bug splatter on the front end. Remove bug residue within 24–48 hours; the enzymes etch clear coat if left longer. PPF on the front bumper, hood, and mirrors is the best long-term protection.',
    },
    {
      title: 'Hurricane Season Prep',
      tip: 'Keep the tank above half during June–November. In the event of evacuation, the CX-50\'s AWD and ground clearance handle flooded streets better than most crossovers. Keep an emergency kit in the cargo area.',
    },
  ],

  maintenanceSchedule: [
    { interval: 'Every 5,000 mi / 6 months',  item: 'Engine Oil & Filter (0W-20 Full Synthetic)', notes: 'More frequent in Miami heat; do not exceed 7,500 mi' },
    { interval: 'Every 5,000 mi',             item: 'Tire Rotation', notes: 'Check pressure and tread depth at each rotation' },
    { interval: 'Every 10,000 mi',            item: 'Cabin Air Filter Inspection', notes: 'Replace if discolored; Miami dust/pollen clogs faster' },
    { interval: 'Every 15,000 mi',            item: 'Engine Air Filter Inspection', notes: 'Inspect; replace if dirty (DIY: 10 min)' },
    { interval: 'Every 20,000 mi / 2 years',  item: 'Brake Fluid Replacement', notes: 'Hygroscopic fluid absorbs moisture — critical in humidity' },
    { interval: 'Every 30,000 mi',            item: 'Spark Plugs Inspection', notes: 'OEM iridium plugs; replace at 60k mi typically' },
    { interval: 'Every 30,000 mi',            item: 'Transmission Fluid Check', notes: 'Inspect at dealer; replace if discolored or smells burnt' },
    { interval: 'Every 45,000 mi',            item: 'Drive Belt Inspection', notes: 'Visual inspection; replace if cracked' },
    { interval: 'Every 45,000 mi',            item: 'Coolant Inspection', notes: 'Check level and condition; flush every 100k mi' },
    { interval: 'Every 60,000 mi',            item: 'Spark Plug Replacement', notes: 'Iridium plugs; standard interval for turbocharged engines' },
    { interval: 'Every 60,000 mi',            item: 'Fuel Filter Inspection', notes: 'In-tank filter; inspect at 60k mi' },
    { interval: 'Annually',                   item: 'Multi-Point Inspection', notes: 'Brakes, suspension, exhaust, all fluids' },
    { interval: 'As Needed',                  item: 'Wiper Blades', notes: 'Driver: 26", Passenger: 16" — J-hook connector' },
    { interval: 'As Needed',                  item: 'Tire Replacement', notes: 'Replace at 2/32" tread; rotate at 5k for even wear' },
  ],

  tuningStatus: [
    { item: 'MazdaEdit ECU Tune',   status: 'Not Available', note: 'CX-50 platform not yet supported. No ETA announced.' },
    { item: 'JB4 Piggyback Tune',   status: 'Partial Support', note: 'Works but limited by sensor differences vs CX-30/Mazda3. Community reports modest gains.' },
    { item: 'CorkSport CAI',        status: 'Available', note: 'CX-50 Turbo specific. ~$225. No CEL, no tune required. 5–16whp claimed.' },
    { item: 'Axle-Back Exhaust',    status: 'Available', note: 'CorkSport, Borla options exist. No tune needed. ~$500–700.' },
    { item: 'Intercooler Upgrade',  status: 'Limited', note: 'Few options available. Most meaningful with a tune — wait for MazdaEdit support.' },
    { item: 'Downpipe Upgrade',     status: 'Not Recommended Yet', note: 'Without ECU tune, gains minimal and risk CEL.' },
  ],
};
