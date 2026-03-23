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
    { label: 'Oil Spec',        value: '0W-20 Full Synthetic (API SP / ILSAC GF-6A)' },
    { label: 'Oil Capacity',    value: '4.8 US qt (with filter) / 4.5 US qt (without)' },
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
    { label: 'Engine Oil',        value: '0W-20 Full Synthetic (API SP / ILSAC GF-6A)',  capacity: '4.8 US qt (with filter)' },
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
    { part: 'Oil Filter',             spec: 'Hand-tight + ¾ turn',  note: 'Do not over-tighten; Mazda P/N PE01-14-302A' },
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

  // ── Common OBD-II Trouble Codes ──────────────────────────────
  obdCodes: [
    { code: 'P0299', title: 'Turbocharger Underboost', severity: 'Warning', meaning: 'Boost pressure is below expected level. Common causes: boost leak in intercooler piping, wastegate actuator stuck open, dirty or clogged air filter, or faulty boost pressure sensor. Check intercooler connections and air filter first.' },
    { code: 'P0171', title: 'System Too Lean (Bank 1)', severity: 'Warning', meaning: 'Engine running lean — too much air or not enough fuel. Common causes: vacuum leak, dirty MAF sensor, weak fuel pump, or cracked intake boot. Clean the MAF sensor with dedicated MAF cleaner (not brake cleaner) as a first step.' },
    { code: 'P0174', title: 'System Too Lean (Bank 2)', severity: 'Warning', meaning: 'Same as P0171 but on Bank 2. On the 2.5T inline-4, this typically appears alongside P0171 if the issue is upstream of the manifold (vacuum leak, MAF sensor). If P0174 appears alone, check injectors or fuel delivery on that side.' },
    { code: 'P0420', title: 'Catalyst Efficiency Below Threshold', severity: 'Advisory', meaning: 'The catalytic converter is not cleaning exhaust efficiently. Often appears after extended idling or short trips. Can be a failing cat, but also caused by an exhaust leak before the rear O2 sensor. Covered under federal emissions warranty (8yr/80k mi).' },
    { code: 'P0300', title: 'Random/Multiple Cylinder Misfire', severity: 'Critical', meaning: 'Multiple cylinders are misfiring. Stop driving if severe — continued misfiring destroys the catalytic converter. Common causes: bad ignition coil, fouled spark plugs, low fuel pressure, or vacuum leak. Check spark plugs and coil packs first.' },
    { code: 'P0301–P0304', title: 'Cylinder 1–4 Misfire', severity: 'Critical', meaning: 'Misfire detected on a specific cylinder. Swap the ignition coil from the misfiring cylinder to another — if the code follows, replace the coil. If it stays, check the spark plug and then injector on that cylinder.' },
    { code: 'P0016', title: 'Crankshaft/Camshaft Position Correlation', severity: 'Warning', meaning: 'Cam timing is off from the expected position. On the SkyActiv 2.5T, this usually indicates a stretched timing chain, failed VVT solenoid, or low oil pressure affecting the variable valve timing. Do not ignore — can cause engine damage.' },
    { code: 'P0128', title: 'Coolant Thermostat Below Regulating Temp', severity: 'Advisory', meaning: 'Engine is taking too long to reach operating temperature. Usually a stuck-open thermostat. Common in cooler months. Not urgent but affects fuel economy and heater performance.' },
    { code: 'P2096', title: 'Post Catalyst Fuel Trim Too Lean', severity: 'Advisory', meaning: 'Downstream O2 sensor reading lean. May indicate a small exhaust leak at the manifold gasket or flex pipe, or an aging catalytic converter. Often paired with P0420.' },
    { code: 'P0456', title: 'EVAP System Small Leak', severity: 'Advisory', meaning: 'Small leak in the evaporative emissions system. Most common cause: loose or worn gas cap. Tighten the cap until it clicks, clear the code, and see if it returns. If it does, check EVAP purge valve and canister vent.' },
    { code: 'C1141', title: 'TPMS Sensor Fault', severity: 'Advisory', meaning: 'One or more TPMS sensors not communicating. Could be a dead sensor battery (they last 5–10 years), or sensor damage from a tire change. Sensor ID must be reprogrammed after replacement — most tire shops have the tool.' },
    { code: 'U0073', title: 'Control Module Communication Bus Off', severity: 'Warning', meaning: 'CAN bus communication failure between modules. Can cause multiple warning lights at once. Check battery terminals for corrosion first. If the battery is weak or alternator failing, CAN bus errors cascade across all modules.' },
  ],

  // ── Driving Modes Explained ──────────────────────────────────
  drivingModes: [
    { mode: 'Normal', description: 'Default driving mode. Linear throttle response, standard transmission shift points, balanced AWD torque distribution (primarily front-biased). Best for everyday commuting and highway cruising. Prioritizes fuel economy and smooth operation.' },
    { mode: 'Sport', description: 'Sharper throttle mapping with quicker response to pedal input. Transmission holds gears longer and downshifts more aggressively. Steering feel firms up slightly. AWD system distributes more torque to the rear. Paddle shifters give full manual control. Best for spirited driving and on-ramps.' },
    { mode: 'Off-Road (if equipped)', description: 'Available on trims with Off-Road mode. Adjusts throttle for low-speed control, loosens traction control to allow more wheel slip, and optimizes AWD for uneven terrain. Hill descent control active. Shift points adjusted for low-speed torque. Best for gravel roads, trails, and sandy/muddy conditions.' },
    { mode: 'i-Activ AWD Behavior', description: 'Not a selectable mode — always active. The i-Activ AWD system uses 27 sensors to predict traction loss before it happens. Monitors: steering angle, road surface, wiper speed, outside temperature, brake pressure, throttle position, and yaw rate. In dry conditions, operates near 100% front-wheel drive. Seamlessly shifts torque rearward when slip is predicted — not reactive, predictive.' },
    { mode: 'Traction Control (TCS)', description: 'Enabled by default. Press and hold TCS button (near shifter) for 3 seconds to disable. Disabling TCS allows more wheelspin — useful for rocking out of sand or snow. TCS re-enables automatically on next ignition cycle. Even with TCS off, stability control remains active unless the car detects you are in Off-Road mode.' },
    { mode: 'i-Stop (Auto Start-Stop)', description: 'Automatically shuts off the engine at stops to save fuel. Restarts instantly when you release the brake. Conditions that prevent i-Stop: A/C compressor load too high, battery charge low, engine not at operating temperature, steep incline, or steering wheel turned. Hold the i-Stop button for 2–3 seconds to disable for the current drive cycle.' },
  ],

  // ── Bulb Replacement Guide ───────────────────────────────────
  bulbGuide: [
    { location: 'Low Beam Headlights', type: 'LED (factory)', note: 'Not user-replaceable bulbs — integrated LED module. Replacement requires the full headlight assembly or a dealer-installed LED module. Covered under bumper-to-bumper warranty.' },
    { location: 'High Beam Headlights', type: 'LED (factory)', note: 'Same as low beam — integrated LED. Meridian Edition has Adaptive Front-Lighting System (AFS) that swivels with steering.' },
    { location: 'Daytime Running Lights (DRL)', type: 'LED (factory)', note: 'Integrated LED strip. Not individually replaceable. Failure is rare; covered under warranty.' },
    { location: 'Front Turn Signals', type: 'LED (factory)', note: 'Integrated into headlight assembly. If switching to aftermarket, ensure compatible LED driver.' },
    { location: 'Fog Lights', type: 'H11 halogen (or LED upgrade)', note: 'Located in lower bumper. Twist-lock socket, accessible from under the fender liner. H11 bulbs are easy to upgrade to LED — just ensure proper beam pattern to avoid blinding oncoming drivers.' },
    { location: 'Rear Tail/Brake Lights', type: 'LED (factory)', note: 'Full LED tail lights on all trims. Not individually replaceable. Entire tail light assembly if needed.' },
    { location: 'Rear Turn Signals', type: 'LED (factory)', note: 'Integrated into tail light assembly.' },
    { location: 'Reverse Lights', type: 'T15 / 921 wedge bulb', note: 'Accessible from inside the liftgate trim. Pop the trim cover, twist the socket counterclockwise, and pull. Easy LED upgrade — improves rear visibility significantly at night.' },
    { location: 'License Plate Lights', type: 'T10 / 194 wedge bulb', note: 'Two small bulbs under the liftgate lip. Pry the lens housing gently with a trim tool. Popular LED upgrade for a cleaner look.' },
    { location: 'Interior Dome / Map Lights', type: 'T10 / 194 or festoon (varies)', note: 'Map lights above the rearview mirror and dome light use T10 wedge bulbs. Cargo area light is a festoon 31mm. Easy DIY LED swap — use 6000K for a clean white interior.' },
    { location: 'Glove Box Light', type: 'T10 / 194 wedge bulb', note: 'Pry the lens gently. Often upgraded alongside other interior LEDs.' },
    { location: 'Side Mirror Turn Signals', type: 'LED (factory)', note: 'Integrated LED strip in mirror housing. Not user-replaceable — full mirror assembly if needed.' },
  ],

  // ── i-Activsense Safety Systems ──────────────────────────────
  safetyFeatures: [
    { feature: 'MRCC (Mazda Radar Cruise Control)', description: 'Adaptive cruise control using front radar. Maintains set speed and following distance. Works from 0–90 mph with full stop-and-go capability. Set via steering wheel controls. Follows the vehicle ahead and can come to a complete stop in traffic, then resume when traffic moves (within ~3 seconds — after that, tap the accelerator or Resume button).', calibration: 'Auto-calibrated. If sensor is blocked (mud, snow on front grille), system temporarily disables with a dashboard message.' },
    { feature: 'CTS (Cruising & Traffic Support)', description: 'Lane-centering assist that works alongside MRCC. Keeps the car centered in its lane using the front camera. Provides gentle steering inputs — not hands-free. Requires hands on the wheel. If it detects your hands off the wheel for ~15 seconds, it gives a visual warning, then audible, then disables.', calibration: 'Camera behind the windshield. Keep the windshield clean in the camera zone (behind rearview mirror). Recalibrates automatically after windshield replacement.' },
    { feature: 'SBS (Smart Brake Support)', description: 'Automatic emergency braking. Detects vehicles and pedestrians ahead using camera + radar. If a collision is imminent and you haven\'t braked, it applies full braking force automatically. Works at speeds up to ~100 mph for vehicles, ~50 mph for pedestrians. Can significantly reduce or prevent collisions.', calibration: 'Requires clean windshield camera zone and unobstructed front radar (behind Mazda logo grille area).' },
    { feature: 'BSM (Blind Spot Monitoring)', description: 'Radar sensors in the rear bumper detect vehicles in your blind spots. Orange warning icon lights up in the side mirror. If you activate the turn signal while a vehicle is detected, the icon flashes and an audible alert sounds. Effective range: approximately one car length behind to the B-pillar.', calibration: 'Rear bumper radar sensors. Keep the rear bumper corners clean — mud, ice, or heavy bug splatter can block the sensors. System shows a warning message when sensors are obstructed.' },
    { feature: 'RCTA (Rear Cross Traffic Alert)', description: 'Uses the same rear radar sensors as BSM. When reversing out of a parking spot, detects vehicles approaching from either side. Alerts with a visual indicator on the dashboard and an audible warning. Some situations trigger automatic braking to prevent a collision.', calibration: 'Same sensors as BSM. Keep rear bumper clean.' },
    { feature: 'LDWS (Lane Departure Warning)', description: 'Camera-based system that detects lane markings. Vibrates the steering wheel and shows a visual alert if you drift out of your lane without signaling. Can be set to Warning only or Warning + Lane Keep Assist (gentle steering correction). Does not work below ~35 mph or if lane markings are unclear.', calibration: 'Relies on clear lane markings — less effective on faded roads or in heavy rain. Camera-based.' },
    { feature: 'DAA (Driver Attention Alert)', description: 'The coffee cup icon. Monitors your steering patterns to detect drowsiness or inattention. If erratic steering is detected, shows a coffee cup icon and suggests taking a break. More sensitive on highway driving. Can be toggled in Settings → Vehicle → Driver Monitoring.', calibration: 'No physical sensor — algorithmic analysis of steering behavior.' },
    { feature: 'HBC (High Beam Control)', description: 'Automatic high beam headlights. Detects oncoming vehicles and taillights ahead, automatically switching between high and low beams. Works above ~25 mph. Occasionally too sensitive in well-lit urban areas — can be disabled via the headlight stalk (push forward to manual high beam).', calibration: 'Front camera. Clean windshield camera zone for reliable operation.' },
    { feature: 'FCTA (Front Cross Traffic Alert)', description: 'Detects vehicles approaching from the sides at intersections when you are about to proceed. Uses front radar. Shows visual warning and can apply automatic braking. Especially useful at T-intersections and parking lot exits where visibility is limited.', calibration: 'Front radar behind grille. Keep grille area unobstructed.' },
    { feature: '360° View Monitor', description: 'Available on Meridian Edition. Four cameras (front, rear, left, right mirrors) create a bird\'s-eye view of the vehicle. Activates automatically in reverse and can be manually activated at low speeds via the camera button on the dashboard. Useful for tight parking. Guidelines are dynamic and follow steering input.', calibration: 'Keep all four camera lenses clean. Lenses can fog or collect water — wipe before use in humid conditions.' },
  ],

  // ── Roof Rack & Cargo ────────────────────────────────────────
  roofCargo: {
    roofRails: {
      type: 'Factory-installed raised roof rails (Meridian Edition standard)',
      material: 'Black anodized aluminum with satin finish',
      maxLoad: '150 lb (68 kg) dynamic load (while driving), 600 lb (272 kg) static load (parked)',
      note: 'Dynamic load rating includes the weight of crossbars, rack, and cargo combined. Always subtract crossbar weight (~10–15 lb) from the dynamic rating to get usable cargo capacity.',
    },
    crossbars: {
      oem: 'Mazda OEM crossbars (P/N 0000-8L-Z13A) — ~$250 from dealer',
      aftermarket: 'Thule Evo Raised Rail, Yakima RailBar, or Rhino-Rack Vortex — all compatible with raised rail mounts',
      maxSpread: 'Approximately 32" between crossbars (adjustable along the rail)',
      note: 'Crossbars must be removed or secured at car washes. Tighten mounting bolts to hand-tight plus ¼ turn — do not over-torque. Check tightness before each trip.',
    },
    compatible: [
      'Roof cargo box (Thule Motion XT, Yakima SkyBox) — stay within 150 lb total dynamic load',
      'Kayak/canoe carrier — J-style or saddle mount, single boat typically 40–70 lb',
      'Bike rack (roof mount) — fork mount or frame mount, 2 bikes max recommended',
      'Ski/snowboard rack — up to 6 pairs of skis or 4 snowboards',
      'Rooftop tent — static load only (600 lb), not for driving. Set up while parked only.',
      'Cargo basket — open-top, good for camping gear. Use a cargo net to secure items.',
    ],
    interiorCargo: {
      seatsUp: '31.4 cu-ft',
      seatsDown: '56.3 cu-ft',
      cargoWidth: '~42 inches between wheel wells',
      cargoLength: '~37 inches (seats up), ~72 inches (seats folded)',
      liftoverHeight: '~31 inches from ground to cargo floor lip',
      maxPayload: '~1,050 lb total vehicle payload (passengers + cargo)',
    },
  },

  // ── Florida-Specific Legal & Registration ────────────────────
  floridaLegal: [
    { title: 'Annual Inspection', info: 'Florida does <strong>not require</strong> annual vehicle safety inspections or emissions testing. Your CX-50 never needs a state inspection sticker. This is different from states like Texas, California, or New York.' },
    { title: 'Registration Renewal', info: 'Florida vehicle registration renews annually on your <strong>birthday</strong>. You can renew online at GoRenew.com, by mail, or at a county tax collector office. Late renewal incurs a $15 penalty after your birthday. Keep proof of insurance current — it is verified electronically at renewal.' },
    { title: 'Window Tint Laws', info: '<strong>Front windshield:</strong> non-reflective tint above the AS-1 line only. <strong>Front side windows:</strong> must allow 28%+ VLT (visible light transmission). <strong>Rear side windows:</strong> any tint darkness. <strong>Rear window:</strong> any tint darkness. <strong>Mirrored/metallic tint is banned</strong> on all windows. Violations are a non-moving infraction (~$116 fine).' },
    { title: 'Insurance Requirements', info: 'Florida requires: <strong>$10,000 PIP</strong> (Personal Injury Protection) and <strong>$10,000 PDL</strong> (Property Damage Liability). Bodily Injury Liability is <strong>not required by law</strong> but strongly recommended (25/50 minimum). Uninsured motorist coverage also highly recommended — Florida has one of the highest uninsured driver rates in the US (~20%).' },
    { title: 'Toll Systems', info: 'Florida uses <strong>SunPass</strong> (statewide) and <strong>E-PASS</strong> (Central FL). Most toll roads are cashless — you need a transponder or will receive a toll-by-plate bill. SunPass Mini attaches to the windshield. The CX-50 does not have a built-in toll transponder.' },
    { title: 'Move Over Law', info: 'Florida law requires you to <strong>move over one lane</strong> (or slow to 20 mph below the speed limit) when passing stopped emergency vehicles, tow trucks, or utility vehicles with flashing lights on the roadside. Violation is a moving violation with points on your license.' },
    { title: 'Hurricane Evacuation Routes', info: 'Know your zone and evacuation route. Miami-Dade evacuation zones are A through E (A is closest to coast). Main routes: <strong>I-75 North</strong> (to Central/North FL), <strong>Florida Turnpike North</strong>, <strong>US-27 North</strong>. During mandatory evacuation, tolls are suspended. Keep your CX-50 tank above half during hurricane season (June 1 – November 30).' },
    { title: 'Parking on Grass', info: 'Many Florida municipalities (including Miami-Dade) prohibit parking on your front lawn/grass. Fines vary by city. Use your driveway or designated parking areas.' },
    { title: 'Red Light Cameras', info: 'Florida allows red light cameras. Violations are $158 (no points if paid). Miami-Dade and surrounding cities use them extensively. The camera captures your license plate — the ticket goes to the registered owner regardless of who was driving.' },
  ],
};
