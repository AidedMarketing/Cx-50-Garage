/* ─── CX-50 Garage — Reference Data ───────────────────────────
   Full owner guide content: specs, hidden tricks, Miami tips,
   maintenance schedule, and quick reference data.
──────────────────────────────────────────────────────────────── */

const ReferenceData = {

  quickSpecs: [
    { label: 'Engine',          value: '2.5L SkyActiv-G Turbo' },
    { label: 'Horsepower',      value: '256 hp (premium) / 227 hp (regular)' },
    { label: 'Torque',          value: '320 lb-ft (premium) / 310 lb-ft (regular)' },
    { label: 'Transmission',    value: '6-speed automatic' },
    { label: 'Drivetrain',      value: 'i-Activ AWD' },
    { label: 'Fuel Type',       value: 'Premium 91+ octane (recommended)' },
    { label: 'Fuel Tank',       value: '15.9 gallons' },
    { label: 'Oil Spec',        value: '5W-30 Full Synthetic (API SP / GF-6)' },
    { label: 'Oil Capacity',    value: '5.1 US qt (with filter) / 4.9 US qt (without)' },
    { label: 'Tire Size (Meridian)', value: '225/60R18 (Falken Wildpeak A/T Trail)' },
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
    { interval: 'Every 5,000 mi / 6 months',  item: 'Engine Oil & Filter (5W-30 Full Synthetic)', notes: 'More frequent in Miami heat; do not exceed 7,500 mi' },
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

  // ── Warning Lights ─────────────────────────────────────────
  warningLights: [
    { light: 'Check Engine (MIL)', icon: '🔶', severity: 'Critical', meaning: 'Engine or emissions fault detected. Flashing = misfire — pull over immediately and reduce speed. Steady = schedule diagnosis soon. Do not ignore; can cause catalytic converter damage.' },
    { light: 'Oil Pressure', icon: '🔴', severity: 'Critical', meaning: 'Oil pressure has dropped below safe level. <strong>Stop immediately</strong> and turn off the engine. Check oil level; do not drive until resolved. Driving without oil pressure will destroy the engine in minutes.' },
    { light: 'Coolant Temperature', icon: '🔴', severity: 'Critical', meaning: 'Engine is overheating. Pull over, turn off A/C, and let the engine cool. Check coolant level when safe. In Miami heat + traffic, this can happen if the cooling system is compromised.' },
    { light: 'Charging System (Battery)', icon: '🔴', severity: 'Critical', meaning: 'Alternator or charging system failure. Battery is not being charged. Drive directly to a shop — you have limited electrical power remaining before the car stalls.' },
    { light: 'Brake System / ABS', icon: '🔴', severity: 'Critical', meaning: 'Brake system malfunction or low brake fluid. If both ABS and brake lights are on, stop driving. If only ABS light, brakes still work but without anti-lock protection.' },
    { light: 'TPMS (Tire Pressure)', icon: '🟡', severity: 'Warning', meaning: 'One or more tires below recommended 35 PSI. Check and inflate all four tires. Common in Miami: pressure drops ~1 PSI per 10°F overnight temp swing. Flashing TPMS = sensor fault.' },
    { light: 'i-Stop (Auto Start-Stop)', icon: '🟡', severity: 'Advisory', meaning: 'i-Stop system deactivated or not ready. Common causes: A/C load too high (Miami heat), battery charge low, engine not warmed up, or hood not fully closed.' },
    { light: 'AWD Warning', icon: '🟡', severity: 'Warning', meaning: 'i-Activ AWD system fault. May default to FWD only. Safe to drive at moderate speeds but schedule diagnosis. Check for mismatched tire sizes first (AWD is sensitive to diameter differences).' },
    { light: 'Power Steering', icon: '🟡', severity: 'Warning', meaning: 'Electric power steering assist reduced or off. Steering will feel very heavy. Safe to drive slowly to a shop but avoid highways.' },
    { light: 'Airbag / SRS', icon: '🔴', severity: 'Critical', meaning: 'Airbag system fault — airbags may not deploy in a crash. Schedule immediate diagnosis. Common cause: connector under the seat, or seatbelt pretensioner issue.' },
    { light: 'Lane Departure / BSM', icon: '🟡', severity: 'Advisory', meaning: 'Blind Spot Monitoring or Lane Departure sensors blocked. Clean the rear bumper radar sensors (salt, dirt, bug splatter). Resets automatically once sensors are clear.' },
    { light: 'Forward Collision Warning', icon: '🟡', severity: 'Advisory', meaning: 'Front camera or radar sensor obstructed. Common in heavy rain or when the windshield is dirty. Clean the windshield in the camera zone (behind rearview mirror). Resets when clear.' },
    { light: 'Auto High Beam', icon: '🟡', severity: 'Advisory', meaning: 'Adaptive headlight system temporarily disabled. Usually caused by a dirty windshield near the camera sensor or extreme weather conditions.' },
    { light: 'Key Fob Battery Low', icon: '🟡', severity: 'Advisory', meaning: 'Key fob battery running low. Replace the CR2025 battery. Until replaced, hold the fob directly against the start button to start the car.' },
    { light: 'Door / Trunk Ajar', icon: '🟡', severity: 'Advisory', meaning: 'A door, liftgate, or hood is not fully closed. Check all doors — the liftgate latch can sometimes not engage fully. Do not drive at speed with a door ajar.' },
    { light: 'Fuel Level Low', icon: '🟡', severity: 'Advisory', meaning: 'Approximately 2 gallons remaining (~30–40 miles range). In Miami, keep the tank above ¼ during hurricane season (June–November).' },
    { light: 'DEF / Emissions', icon: '🟡', severity: 'Advisory', meaning: 'Not applicable to the 2023 CX-50 gasoline turbo. If you see this, it may be a false code — schedule a scan.' },
  ],

  // ── Emergency & Roadside ───────────────────────────────────
  emergencyInfo: [
    { title: 'Mazda Roadside Assistance', info: '<strong>1-800-866-1998</strong> — included free for 3 years / 36,000 miles from purchase date. Covers towing, flat tire, lockout, jump start, and fuel delivery.' },
    { title: 'Spare Tire', info: 'The 2023 CX-50 comes with a <strong>temporary compact spare</strong> ("donut") rated for max 50 mph. Located under the cargo floor. Lug wrench and jack are in the cargo area foam tray. Do not drive more than 50 miles on the spare.' },
    { title: 'Jack Points', info: 'The jack points are the <strong>reinforced pinch welds</strong> behind the front wheels and ahead of the rear wheels along the rocker panel. Look for the triangular notch marks. Never jack under the engine, transmission, or subframe.' },
    { title: 'Jump Start Procedure', info: '1) Connect <strong>red</strong> cable to dead battery <strong>+</strong> terminal. 2) Connect other red end to booster battery <strong>+</strong>. 3) Connect <strong>black</strong> cable to booster battery <strong>–</strong>. 4) Connect other black end to an <strong>unpainted metal ground point</strong> on the engine block (not the dead battery –). Start the booster car, then your car. Disconnect in reverse order.' },
    { title: 'Hood Release', info: 'Pull the <strong>hood release lever</strong> on the lower-left side of the driver footwell. Then reach under the front center of the hood gap and slide the <strong>secondary safety latch</strong> to the left while lifting. Lower the hood from ~8 inches — don\'t slam it.' },
    { title: 'Dead Key Fob Entry', info: 'If your fob battery dies: 1) There is a <strong>physical key</strong> hidden inside the fob — press the release button on the back to slide it out. 2) Use it on the driver\'s door lock. 3) To start the car, hold the fob directly against the Start/Stop button and press — the NFC chip will still work.' },
    { title: 'Lug Nut Torque', info: '<strong>80 lb-ft (108 Nm)</strong> — always torque in a star pattern after any wheel change. Over-torquing can warp brake rotors; under-torquing risks the wheel coming loose.' },
    { title: 'OBD-II Port Location', info: 'The OBD-II diagnostic port is on the <strong>driver\'s side, below the dash</strong>, immediately to the left of the hood release lever in a small recessed pocket. Accessible without removing any panels.' },
    { title: 'Tow Hook Location', info: 'The front tow hook eye is stored in the <strong>trunk tool kit</strong>. Screw it into the threaded hole behind the small <strong>pop-out cover</strong> on the front bumper (driver\'s side). Turn clockwise until tight. Only for flat-surface towing — never yank.' },
  ],

  // ── Key Fob Guide ──────────────────────────────────────────
  keyFobGuide: [
    { title: 'Remote Start (if equipped)', tip: 'Press <strong>Lock</strong>, then press and hold the <strong>remote start button</strong> (circular arrow icon) for 2+ seconds. Engine runs for 10 minutes with climate on. Press again to extend another 10 minutes. Max two extensions.' },
    { title: 'Open All Windows Remotely', tip: 'Press and hold the <strong>Unlock</strong> button for 3+ seconds. All four windows will roll down. Useful for venting Miami cabin heat before getting in.' },
    { title: 'Close All Windows Remotely', tip: 'Press and hold the <strong>Lock</strong> button for 3+ seconds. All four windows will roll up. Great for when you realize you left them cracked at the office.' },
    { title: 'Fob Battery Type', tip: 'The key fob uses a <strong>CR2025</strong> 3V lithium coin cell. Replace by prying the fob halves apart with a coin wrapped in cloth (to avoid scratching). Battery life is typically 1–2 years.' },
    { title: 'Hidden Physical Key', tip: 'Press the small <strong>release tab</strong> on the back of the fob and slide out the emergency metal key. This works on the driver\'s door lock only — there is no passenger-side keyhole.' },
    { title: 'Walk-Away Lock', tip: 'With the fob in your pocket, just walk away from the car — it locks automatically after a few seconds if you have Walk-Away Lock enabled in Settings → Door Locks. All doors and liftgate lock; hazards flash to confirm.' },
    { title: 'Approach Unlock', tip: 'With the fob in your pocket, touch the driver\'s door handle sensor to unlock the driver\'s door. Touch again (or grab the rear handle) to unlock all doors. No need to press any fob button.' },
    { title: 'Liftgate Kick Sensor', tip: 'The Meridian Edition has a <strong>hands-free power liftgate</strong>. With the fob on you, kick your foot under the rear bumper center to open or close the liftgate. Wait for the beep before kicking — both feet need to be on the ground.' },
  ],

  // ── Fluid Capacities & Specs ───────────────────────────────
  fluidSpecs: [
    { label: 'Engine Oil',        value: '5W-30 Full Synthetic (API SP / GF-6)',  capacity: '5.1 US qt (with filter)' },
    { label: 'Coolant',           value: 'Mazda FL-22 Long-Life (pre-mixed)',     capacity: '~7.9 US qt (total system)' },
    { label: 'Transmission Fluid',value: 'Mazda ATF FZ (SkyActiv-Drive)',          capacity: '~8.2 US qt (total system)' },
    { label: 'Brake Fluid',       value: 'DOT 3 or DOT 4',                        capacity: 'Fill to MAX line on reservoir' },
    { label: 'Power Steering',    value: 'Electric (no fluid required)',           capacity: 'N/A — fully electric assist' },
    { label: 'Windshield Washer', value: 'Any commercial washer fluid',            capacity: '~1.1 US gal (4.0L)' },
    { label: 'Rear Differential', value: 'Mazda 75W-90 GL-5 gear oil',            capacity: '~0.65 US qt' },
    { label: 'Transfer Case',     value: 'Mazda ATF FZ',                           capacity: '~0.63 US qt' },
  ],

  // ── DIY Torque Specs ───────────────────────────────────────
  torqueSpecs: [
    { part: 'Lug Nuts',               spec: '80 lb-ft (108 Nm)',    note: 'Star pattern; re-torque after 50–100 miles' },
    { part: 'Oil Drain Plug',         spec: '30 lb-ft (40 Nm)',     note: 'Replace crush washer each oil change' },
    { part: 'Oil Filter',             spec: 'Hand-tight + ¾ turn',  note: 'Do not over-tighten; Mazda P/N PE02-14-302A' },
    { part: 'Spark Plugs',            spec: '11–17 lb-ft (15–23 Nm)', note: 'Iridium; anti-seize not recommended on coated threads' },
    { part: 'Skid Plate Bolts',       spec: '12–17 lb-ft (16–23 Nm)', note: 'Access required for oil changes' },
    { part: 'Engine Mount Bolts',     spec: '68 lb-ft (93 Nm)',     note: 'Check during multi-point inspection' },
    { part: 'Caliper Bracket Bolts',  spec: '60 lb-ft (81 Nm)',     note: 'Front; check torque after brake service' },
  ],

  // ── Warranty Coverage ──────────────────────────────────────
  warranty: [
    { coverage: 'Bumper-to-Bumper',     duration: '3 years / 36,000 miles',  notes: 'Covers virtually everything except wear items (brakes, wipers, tires). Whichever comes first.' },
    { coverage: 'Powertrain',           duration: '5 years / 60,000 miles',  notes: 'Engine, transmission, drivetrain, turbocharger. Covers internal components and seals.' },
    { coverage: 'Corrosion / Perforation', duration: '5 years / unlimited miles', notes: 'Rust-through coverage on body panels. Important for Miami salt air exposure near the coast.' },
    { coverage: 'Roadside Assistance',  duration: '3 years / 36,000 miles',  notes: 'Towing, flat tire, lockout, jump start, fuel delivery. Call 1-800-866-1998.' },
    { coverage: 'Federal Emissions',    duration: '8 years / 80,000 miles',  notes: 'Covers catalytic converter and engine control module (ECM) under federal mandate.' },
    { coverage: 'Hybrid Battery',       duration: 'N/A',                     notes: 'Not applicable — the CX-50 2.5T is a standard combustion turbo engine.' },
  ],

  // ── Seasonal Checklists ────────────────────────────────────
  checklists: {
    summer: {
      title: 'Pre-Summer Prep (April–May)',
      items: [
        'A/C performance check — verify cold air, check for mold in vents',
        'Coolant level and hose condition — Miami heat stresses the cooling system',
        'Battery test — heat + humidity accelerate degradation faster than cold',
        'Tire pressure and tread depth — heat increases PSI; check for UV dry rot',
        'Oil change if within 1,000 mi of due interval',
        'Replace cabin air filter — prevents mold and musty smell from humidity',
        'Check wiper blades — rubber deteriorates fast in Florida sun',
        'Wax or ceramic coat exterior — UV and acid rain protection',
        'Apply UV protectant to dashboard and leather seats',
        'Verify windshield sunshade is in the car',
      ],
    },
    hurricane: {
      title: 'Hurricane Season (June 1 – Nov 30)',
      items: [
        'Keep fuel tank at least half full at all times',
        'Battery fully charged — you may need to evacuate quickly',
        'Spare tire inflated and jack kit accessible',
        'Test all lights: headlights, brake, hazards, fog lights',
        'Wiper blades in good condition for torrential rain',
        'Emergency kit stocked: flashlight, water, phone charger, first-aid, flares',
        'Insurance card, registration, and contacts in waterproof pouch',
        'Know your elevated parking options (multi-story garages, upper levels)',
        'Clear sunroof drain channels and cowl area of debris',
        'Check door and window seals for leaks',
      ],
    },
    roadTrip: {
      title: 'Road Trip Checklist',
      items: [
        'Tire pressure (35 PSI), tread depth, and spare tire check',
        'All fluids: oil, coolant, brake, washer — top off or change if due',
        'Brake pad and rotor inspection — listen for noise during test drive',
        'Battery charge and terminal condition',
        'All lights and signals working (headlights, brake, turn, hazards)',
        'Belts and hoses visual inspection — look for cracks, soft spots',
        'Wiper blades and washer fluid',
        'A/C blowing cold — critical for Florida summer trips',
        'Check NHTSA for open recalls before departure',
        'Roadside kit stocked: jumper cables, tire inflator, tool kit',
        'Insurance card, registration, and roadside assistance number accessible',
      ],
    },
  },

  // ── How-To Quick Fixes ─────────────────────────────────────
  howTo: [
    { title: 'Reset TPMS Light', steps: 'After inflating all tires to 35 PSI, drive for 5–10 minutes at 25+ mph. The TPMS recalibrates automatically on the CX-50 — there is no manual reset button. If the light persists, check the spare tire pressure (60 PSI) or visit a dealer to check sensor batteries.' },
    { title: 'Reset Maintenance Reminder', steps: 'Go to <strong>Settings → Vehicle → Maintenance</strong> on the infotainment screen. Select the wrench icon and choose "Reset" for the applicable interval. Alternatively, your dealer resets it at each service visit.' },
    { title: 'Pair / Re-pair Bluetooth', steps: 'Infotainment → <strong>Settings → Bluetooth</strong> → "Add New Device." On your phone, find "MAZDA" in Bluetooth settings. If reconnection fails, delete the MAZDA pairing on your phone AND delete your phone from the car, then re-pair fresh.' },
    { title: 'Reset Infotainment System', steps: 'Press and hold the <strong>Media, Nav, and Mute</strong> buttons simultaneously for 10–15 seconds. The screen will go black and the system reboots. No settings are lost.' },
    { title: 'Disable Speed Warning Beep', steps: 'Settings → Vehicle → Active Driving Display (HUD). Toggle off the <strong>Speed Warning</strong> or adjust the threshold. This is the beep when you exceed a set speed — not the seatbelt reminder.' },
    { title: 'Fold Mirrors on Lock', steps: 'Settings → Door Locks → <strong>Auto Mirror Fold</strong>. When enabled, mirrors fold in every time you lock the car and unfold on unlock. Useful for tight Miami parking and overnight street parking.' },
    { title: 'Calibrate Compass', steps: 'If the compass (in the rearview mirror or HUD) shows the wrong direction after a battery disconnect, drive in 2–3 slow complete circles in an open parking lot. It recalibrates automatically.' },
    { title: 'Replace Cabin Air Filter (DIY)', steps: 'Open the glove box → squeeze the side damper tabs inward → lower the glovebox past its stops → remove the filter cover clip → slide out old filter → insert new one (airflow arrow pointing down). Takes 5 minutes, no tools needed.' },
  ],

  // ── Break-In Period ───────────────────────────────────────────
  breakInPeriod: {
    distance: 'First 600 miles (1,000 km)',
    recommendations: [
      'Do not race the engine.',
      'Do not maintain one constant speed (slow or fast) for extended periods.',
      'Do not drive at full throttle or high RPM for extended periods.',
      'Avoid unnecessary hard stops.',
      'Avoid full-throttle starts.',
      'Do not tow a trailer during the break-in period.',
      'Avoid using cruise control — vary your RPMs to help piston rings seat properly.',
    ],
    additionalNotes: 'No special break-in procedure is required, but following these precautions in the first 600 miles may improve long-term performance, fuel economy, and engine life. Brake pads and tires also need approximately 200 miles to fully bed in and reach optimal grip.',
  },

  // ── Tire Specs (Detailed) ─────────────────────────────────────
  tireSpecs: {
    meridianEdition: {
      wheelSize: '18-inch alloy',
      tireSize: '225/60R18',
      oeTire: 'Falken Wildpeak A/T Trail',
      oeFeatures: 'All-terrain, 3-Peak Mountain Snowflake rated (severe snow), 2-ply polyester construction, rugged sidewall protection.',
    },
    otherTurboTrims: {
      wheelSize: '20-inch alloy',
      tireSize: '245/45R20',
      oeTire: 'All-season (varies by trim)',
    },
    spareTire: 'T155/90D17 compact temporary spare — 50 mph max, 17x4T wheel (Kenda)',
    rotationPattern: {
      nonDirectional: 'Rearward cross: rear tires move straight to front, front tires cross to opposite rear positions.',
      directional: 'Front-to-rear on the same side only (no crossing).',
      interval: 'Every 5,000 miles (AWD vehicles may benefit from 3,000–5,000 mi intervals)',
    },
    treadDepth: {
      newTire: '~10/32"',
      legalMinimum: '2/32" — replace immediately',
      recommended: 'Replace at 4/32" for wet-weather safety; 5/32" for off-road / all-terrain use',
    },
    pressure: '35 PSI front and rear (check when cold)',
    replacementOptions: [
      'Falken Wildpeak A/T Trail 225/60R18 (OE exact match)',
      'Yokohama Geolandar A/T G015 225/60R18',
      'Continental TerrainContact A/T 225/60R18',
      'Toyo Open Country A/T III 225/60R18',
      'BFGoodrich Trail-Terrain T/A 225/60R18',
    ],
  },

  // ── OBD-II Port ───────────────────────────────────────────────
  obdPort: {
    location: 'Under the dashboard on the driver side, immediately to the left of the hood release lever, in a recessed area near the steering column.',
    howToFind: 'Look below the dash panel near the fuse box area. Slightly recessed — you may need to reach underneath and feel for it.',
    notes: 'Mazda calls it the "malfunction diagnosis connector." Do not leave devices plugged in when not diagnosing — it can drain the battery. Ensure vehicle is off before connecting a scanner.',
    protocol: 'Standard OBD-II (CAN bus)',
  },

  // ── Mazda Connected Services ──────────────────────────────────
  connectedServices: {
    appName: 'MyMazda App',
    appPlatforms: 'iOS (App Store) and Android (Google Play)',
    trialPeriod: '3-year complimentary trial (from date of first sale for 2023 models)',
    subscriptionCost: '$10/month ($120/year) after trial expires, auto-renewed',
    features: [
      'Remote Engine Start / Stop',
      'Remote Door Lock / Unlock',
      'Vehicle Health Reports (tire pressure, fuel level, battery status)',
      'Vehicle Status Alerts',
      'Find My Vehicle (GPS location)',
      'Maintenance reminders and recall notifications',
      'Service history tracking',
      'Dealer appointment scheduling',
    ],
    limitations: [
      'Remote start is app-only — the factory key fob cannot remote start the vehicle.',
      'Only one registered device per vehicle at a time.',
      'Requires cellular connectivity (built-in vehicle modem).',
      'After the 3-year trial, all remote features require the paid subscription.',
    ],
  },
};
