/* ─── CX-50 Garage — App Core ──────────────────────────────── */

const App = (() => {

  // ── Utilities first — uid() needed by DEFAULT_MODS ──────────
  function uid() {
    return Math.random().toString(36).slice(2, 9);
  }

  function toast(msg, duration = 1800) {
    const existing = document.getElementById('cx50-toast');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.id = 'cx50-toast';
    el.textContent = msg;
    el.style.cssText = `
      position:fixed; bottom:calc(var(--nav-height) + env(safe-area-inset-bottom,0px) + 16px); left:50%;
      transform:translateX(-50%) translateY(8px); background:#1A1A1A; color:#fff;
      padding:10px 18px; border-radius:20px; font-size:13px; font-weight:500;
      z-index:9999; opacity:0; transition:opacity 0.18s, transform 0.18s;
      white-space:nowrap; pointer-events:none; box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-50%) translateY(8px)';
      setTimeout(() => el.remove(), 200);
    }, duration);
  }

  // ── State ────────────────────────────────────────────────────
  const KEYS = {
    maintenance: 'cx50_maintenance',
    mods:        'cx50_mods',
    fuel:        'cx50_fuel',
    vehicle:     'cx50_vehicle',
    settings:    'cx50_settings',
    documents:   'cx50_documents',
  };

  const DEFAULT_VEHICLE = {
    year: '2023',
    make: 'Mazda',
    model: 'CX-50',
    trim: 'Turbo — Meridian Edition',
    engine: '2.5L SkyActiv-G Turbo',
    hp: '256',
    torque: '320',
    drivetrain: 'AWD',
    transmission: '6-Speed Automatic',
    wiperDriver: '26"',
    wiperPassenger: '16"',
    oilSpec: '0W-20 Full Synthetic',
    oilCapacity: '4.8 qt',
    tirePressure: '35 PSI',
    fuelType: 'Premium (91+ octane)',
  };

  // uid() is defined above so these IDs generate correctly
  // Priority tiers: 1 = Do First (protection essentials), 2 = Do Next (sound + more protection),
  //                 3 = Quality of Life (comfort, tech, cosmetic), 4 = Future / Optional
  const DEFAULT_MODS = [
    // ── Tier 1: Do First — Protection Essentials ───────────────
    { id: uid(), name: 'Ceramic Window Tint', status: 'to-do', priority: 'high', tier: 1, category: 'Protection', estimatedCost: 450, actualCost: null, brand: 'Llumar CTX or 3M Crystalline', installType: 'Shop', notes: 'Miami heat demands ceramic (not dyed). FL law: front side 28% VLT min, rear any darkness. Windshield strip allowed. Blocks 99% UV and up to 60% solar heat. Do this first — protects interior from day one.', dateInstalled: null },
    { id: uid(), name: 'Paint Protection Film (PPF)', status: 'to-do', priority: 'high', tier: 1, category: 'Protection', estimatedCost: 1200, actualCost: null, brand: 'XPEL Ultimate Plus or LLumar', installType: 'Shop', notes: 'Full front kit (hood, fenders, bumper, mirrors, headlights). Miami road debris, bugs, and salt air make this essential. Self-healing film. Pair with ceramic coating for maximum protection. Budget option: partial hood + bumper ~$700.', dateInstalled: null },
    { id: uid(), name: 'All-Weather Floor Mats', status: 'to-do', priority: 'high', tier: 1, category: 'Protection', estimatedCost: 150, actualCost: null, brand: 'WeatherTech or 3D MAXpider', installType: 'DIY', notes: 'Miami rain, sand, and daily wear. WeatherTech FloorLiners or 3D MAXpider KAGUs (softer, quieter). OEM mats are decent but aftermarket has better coverage. Protects resale value significantly.', dateInstalled: null },
    { id: uid(), name: 'Cargo Liner', status: 'to-do', priority: 'high', tier: 1, category: 'Protection', estimatedCost: 100, actualCost: null, brand: 'WeatherTech or OEM Mazda', installType: 'DIY', notes: 'Protects cargo area from groceries, beach gear, wet items. WeatherTech cargo liner has raised edges to contain spills. Companion to floor mats — complete interior protection.', dateInstalled: null },
    { id: uid(), name: 'Dashcam (Front + Rear)', status: 'to-do', priority: 'high', tier: 1, category: 'Comfort & Tech', estimatedCost: 300, actualCost: null, brand: 'Vantrue N4 or Thinkware U1000', installType: 'Shop', notes: 'Hardwire kit enables parking mode surveillance. Must use capacitor-based model for Miami heat (not battery). Vantrue N4 has 3-channel (front+rear+cabin). Thinkware U1000 has 4K front. Professional install hides wires cleanly.', dateInstalled: null },
    { id: uid(), name: 'Windshield Sun Shade', status: 'to-do', priority: 'high', tier: 1, category: 'Protection', estimatedCost: 35, actualCost: null, brand: 'WeatherTech or Covercraft', installType: 'DIY', notes: 'Miami sun essential. Custom-fit shade blocks UV and keeps cabin 20-30°F cooler when parked. Protects dashboard and infotainment screen from UV damage. Cheap insurance — use every time you park outdoors.', dateInstalled: null },
    { id: uid(), name: 'Rain-X Windshield Treatment', status: 'to-do', priority: 'high', tier: 1, category: 'Protection', estimatedCost: 12, actualCost: null, brand: 'Rain-X or Aquapel', installType: 'DIY', notes: 'Near-mandatory for Miami rainy season (June–November). Hydrophobic coating causes rain to bead and fly off at highway speeds. Dramatically improves visibility in downpours. Reapply every 2-3 months. 5-min DIY application.', dateInstalled: null },
    { id: uid(), name: 'OEM Wheel Locks', status: 'to-do', priority: 'high', tier: 1, category: 'Protection', estimatedCost: 55, actualCost: null, brand: 'Genuine Mazda (C9N3V9740)', installType: 'DIY', notes: 'Chrome dual-hex locking lug nuts replace one lug per wheel. Unique key pattern makes wheels virtually tamper-proof. Essential in Miami — wheel theft is common on SUVs. 4-lock set with key socket. Takes 10 minutes to install. Not compatible with steel wheels.', dateInstalled: null },
    { id: uid(), name: 'Steering Wheel Lock', status: 'to-do', priority: 'medium', tier: 1, category: 'Protection', estimatedCost: 45, actualCost: null, brand: 'The Club or ZYLHDD Twin Bar', installType: 'DIY', notes: 'Visible deterrent against car theft. High-visibility yellow or red models recommended — thieves move on to easier targets. Twin bar/double hook designs resist sawing and hammering. Installs in 5 seconds. Some insurance companies offer discounts for anti-theft devices. Peace of mind for overnight street parking.', dateInstalled: null },
    { id: uid(), name: 'Infotainment Screen Protector', status: 'to-do', priority: 'medium', tier: 1, category: 'Protection', estimatedCost: 15, actualCost: null, brand: 'LFOTPP or Spigen', installType: 'DIY', notes: 'Tempered glass protector for the 10.25-inch infotainment display. Guards against fingerprint scratches, UV haze, and glare. Maintains touch sensitivity and display clarity. Bubble-free installation with alignment tool. Cheap insurance — replace if it chips instead of the screen.', dateInstalled: null },
    { id: uid(), name: 'Touch-Up Paint Pen', status: 'to-do', priority: 'medium', tier: 1, category: 'Protection', estimatedCost: 20, actualCost: null, brand: 'Genuine Mazda OEM', installType: 'DIY', notes: 'Color-matched touch-up paint for rock chips and minor scratches. Get the exact OEM color code from driver door jamb sticker. Pen tip + brush combo for different chip sizes. Apply ASAP to prevent rust from Miami salt air and humidity. Keep in glove box for quick fixes.', dateInstalled: null },

    // ── Tier 2: Do Next — Sound, Performance & More Protection ─
    { id: uid(), name: 'Cold Air Intake (CAI)', status: 'to-do', priority: 'high', tier: 2, category: 'Sound / Performance', estimatedCost: 225, actualCost: null, brand: 'CorkSport SRI', installType: 'DIY', notes: 'CorkSport Short Ram Intake — unlocks turbo whoosh and blow-off sound. Use dry-flow filter only (no oiled filters near MAF). Heat shield highly recommended for Miami summer. ~20 min DIY install. Will not void Mazda warranty per Magnuson-Moss.', dateInstalled: null },
    { id: uid(), name: 'Axle-Back Exhaust Upgrade', status: 'researching', priority: 'medium', tier: 2, category: 'Sound / Performance', estimatedCost: 600, actualCost: null, brand: 'CorkSport or Borla S-Type', installType: 'Shop', notes: 'Deeper exhaust note without drone. Axle-back is bolt-on, no tune needed. CorkSport is most popular for CX-50. Borla S-Type is quieter/refined. Pairs perfectly with CAI for full intake+exhaust sound.', dateInstalled: null },
    { id: uid(), name: 'Ceramic Coating', status: 'to-do', priority: 'medium', tier: 2, category: 'Protection', estimatedCost: 800, actualCost: null, brand: 'Gtechniq Crystal Serum or Ceramic Pro', installType: 'Shop', notes: 'Apply on top of PPF and on all non-PPF surfaces. 2-5 year hydrophobic protection. Makes washing easier and protects against Miami salt air, bird droppings, and UV. Professional application recommended for best results.', dateInstalled: null },
    { id: uid(), name: 'Mud Flaps / Splash Guards', status: 'to-do', priority: 'medium', tier: 2, category: 'Protection', estimatedCost: 100, actualCost: null, brand: 'OEM Mazda or Rally Armor', installType: 'DIY', notes: 'Protects rocker panels, doors, and wheel wells from road debris and Miami rain spray. OEM fits best. Rally Armor for a more rugged look. Easy 30-min DIY install with basic tools.', dateInstalled: null },
    { id: uid(), name: 'Door Edge Guards & Sill Protectors', status: 'to-do', priority: 'medium', tier: 2, category: 'Protection', estimatedCost: 60, actualCost: null, brand: 'OEM Mazda or PPF strips', installType: 'DIY', notes: 'Clear PPF strips on door edges prevent paint chips from parking lot dings. Door sill protectors prevent scuffs from shoes. Cheap and invisible protection. Can be done as part of PPF install.', dateInstalled: null },
    { id: uid(), name: 'Window Visors / Rain Guards', status: 'to-do', priority: 'medium', tier: 2, category: 'Protection', estimatedCost: 80, actualCost: null, brand: 'WeatherTech or OEM Mazda', installType: 'DIY', notes: 'Allows cracking windows in Miami rain without water entry. Reduces cabin heat buildup when parked. In-channel style looks cleanest. Also reduces wind noise at highway speed with windows cracked.', dateInstalled: null },
    { id: uid(), name: 'Undercarriage Coating', status: 'researching', priority: 'medium', tier: 2, category: 'Protection', estimatedCost: 350, actualCost: null, brand: 'Fluid Film or 3M Rubberized', installType: 'Shop', notes: 'Critical for Miami coastal driving. Salt air from Biscayne Bay and causeways causes accelerated undercarriage corrosion. Protects brake lines, wheel wells, exhaust, and frame. Shop install required (lift needed). Monthly undercarriage rinse also recommended.', dateInstalled: null },
    { id: uid(), name: 'Roof Rack Cross Bars', status: 'to-do', priority: 'medium', tier: 2, category: 'Comfort & Tech', estimatedCost: 200, actualCost: null, brand: 'OEM Mazda or Snailfly', installType: 'DIY', notes: 'CX-50 has factory roof rails but no cross bars. Enables cargo boxes, bike racks, kayak mounts. Snailfly is the forum favorite for price/quality (~$230). OEM silver bars available. Locking mechanisms prevent theft. 300 lb dynamic capacity.', dateInstalled: null },
    { id: uid(), name: 'Turbo Inlet Pipe (TIP)', status: 'researching', priority: 'medium', tier: 2, category: 'Sound / Performance', estimatedCost: 150, actualCost: null, brand: 'CorkSport', installType: 'DIY', notes: 'Replaces restrictive factory turbo inlet with larger-diameter smooth pipe. Improves airflow into the turbo and amplifies turbo spool sounds. Pairs with CorkSport SRI for the complete intake system — SRI + TIP + Heat Shield is the ideal combo. Direct bolt-on, ~30 min DIY install.', dateInstalled: null },
    { id: uid(), name: 'SRI Heat Shield', status: 'to-do', priority: 'medium', tier: 2, category: 'Sound / Performance', estimatedCost: 100, actualCost: null, brand: 'CorkSport', installType: 'DIY', notes: 'Laser-cut carbon steel heat shield seals the intake from radiator and engine heat. Uses OEM air ducting to feed cooler outside air to the filter. Powder coated wrinkle black. Critical for Miami — intake air temps matter for turbo performance. Pairs with CorkSport SRI. Multi-piece riveted design.', dateInstalled: null },
    { id: uid(), name: 'Trailer Hitch + Wiring Harness', status: 'to-do', priority: 'medium', tier: 2, category: 'Comfort & Tech', estimatedCost: 350, actualCost: null, brand: 'Curt + OEM Mazda wiring', installType: 'Shop', notes: 'Curt Class III hitch is the community favorite. OEM wiring harness integrates with the CX-50 computer — enables "Trailer" driving mode automatically when connected. 3,500 lb towing capacity. Opens up bike rack, cargo carrier, and small trailer options. Hidden behind bumper when not in use.', dateInstalled: null },
    { id: uid(), name: 'Door Handle Cup PPF', status: 'to-do', priority: 'medium', tier: 2, category: 'Protection', estimatedCost: 25, actualCost: null, brand: 'Lamin-x or WeatherTech', installType: 'DIY', notes: 'Clear polyurethane film applied inside door handle cups — prevents fingernail scratches on paint. Invisible once installed. Lamin-x offers precut CX-50-specific kit with 10-year guarantee. WeatherTech kit also includes door edge and sill protection. 15-min install, no tools needed.', dateInstalled: null },
    { id: uid(), name: 'GPS Tracker / Anti-Theft Monitor', status: 'researching', priority: 'medium', tier: 2, category: 'Comfort & Tech', estimatedCost: 100, actualCost: null, brand: 'CARLOCK or AirTag', installType: 'DIY', notes: 'CARLOCK plugs into OBD port — real-time 4G tracking, movement alerts, and suspicious behavior notifications via phone app. Alternative: Apple AirTag hidden in vehicle ($30) for basic location tracking. Miami has higher vehicle theft rates — real-time alerts give you a head start. Some insurance discounts available.', dateInstalled: null },

    // ── Tier 3: Quality of Life — Comfort, Tech & Cosmetic ─────
    { id: uid(), name: 'Wireless CarPlay Adapter', status: 'to-do', priority: 'medium', tier: 3, category: 'Comfort & Tech', estimatedCost: 80, actualCost: null, brand: 'Carlinkit 4.0 or AAWireless', installType: 'DIY', notes: 'Stock CX-50 is wired CarPlay only. Plug-and-play dongle, 2-minute setup. Carlinkit 4.0 is fastest/most reliable. Minor 1-2 sec connection delay on start. Keep phone in pocket — true wireless convenience.', dateInstalled: null },
    { id: uid(), name: 'LED Interior Light Kit', status: 'to-do', priority: 'low', tier: 3, category: 'Cosmetic', estimatedCost: 30, actualCost: null, brand: 'LASFIT or Diode Dynamics', installType: 'DIY', notes: 'Replace all interior bulbs with bright white LEDs: map lights, dome, cargo, vanity mirrors, trunk. Stock bulbs are dim and warm. LEDs are brighter and draw less power. 15-min swap with trim tool.', dateInstalled: null },
    { id: uid(), name: 'Hood Struts / Lift Kit', status: 'to-do', priority: 'low', tier: 3, category: 'Comfort & Tech', estimatedCost: 55, actualCost: null, brand: 'CorkSport', installType: 'DIY', notes: 'CorkSport hood struts replace the stock prop rod. Hood stays open hands-free — much easier for engine bay access and maintenance. 10-min bolt-on install. One of the most popular CX-50 QoL mods.', dateInstalled: null },
    { id: uid(), name: 'Center Console Organizer', status: 'to-do', priority: 'low', tier: 3, category: 'Comfort & Tech', estimatedCost: 25, actualCost: null, brand: 'JDMCAR or aftermarket', installType: 'DIY', notes: 'Custom-fit tray organizer for the deep center console. Keeps keys, wallet, sunglasses, and small items from rattling around. Drop-in install, no adhesive needed.', dateInstalled: null },
    { id: uid(), name: 'Black Emblem Overlays', status: 'researching', priority: 'low', tier: 3, category: 'Cosmetic', estimatedCost: 40, actualCost: null, brand: 'Orsini Vinyl or custom vinyl', installType: 'DIY', notes: 'Gloss black vinyl overlays on front/rear Mazda emblems and CX-50 badges. Clean blacked-out look. Removable if you change your mind. Alternative: plasti-dip for matte black finish.', dateInstalled: null },
    { id: uid(), name: 'Phone Mount (MagSafe)', status: 'to-do', priority: 'medium', tier: 3, category: 'Comfort & Tech', estimatedCost: 70, actualCost: null, brand: 'CravenSpeed Gemini or LUNQIN', installType: 'DIY', notes: 'CravenSpeed Gemini is machined in the USA with lifetime warranty — MagSafe compatible for wireless charging while mounted. Requires two small drilled holes for rock-solid stability. LUNQIN air vent mount is no-drill alternative (~$20). Keeps phone at eye level for navigation without blocking vents.', dateInstalled: null },
    { id: uid(), name: 'Wireless Charging Pad', status: 'to-do', priority: 'medium', tier: 3, category: 'Comfort & Tech', estimatedCost: 80, actualCost: null, brand: 'OEM Mazda', installType: 'DIY', notes: 'Genuine Mazda Qi wireless charging pad installs in the center console armrest area. Drop your phone in, indicator light turns green when charging. No more cable clutter. Works with any Qi-enabled phone. Pairs well with wireless CarPlay adapter for a fully wireless cockpit.', dateInstalled: null },
    { id: uid(), name: 'Cargo Net', status: 'to-do', priority: 'low', tier: 3, category: 'Comfort & Tech', estimatedCost: 20, actualCost: null, brand: 'OEM Mazda or generic', installType: 'DIY', notes: 'Elastic cargo net hooks into the trunk tie-down points. Keeps groceries, bags, and loose items from sliding around. Super cheap and genuinely useful for daily driving. OEM net fits perfectly. Can also get a vertical barrier net to partition the cargo area.', dateInstalled: null },
    { id: uid(), name: 'Retractable Cargo Cover', status: 'to-do', priority: 'low', tier: 3, category: 'Comfort & Tech', estimatedCost: 120, actualCost: null, brand: 'OEM Mazda', installType: 'DIY', notes: 'Retractable tonneau-style cover hides valuables in the cargo area from prying eyes. Important for Miami parking lots. Slides back easily for loading. Works with rear seats folded or upright. OEM version matches interior trim perfectly.', dateInstalled: null },
    { id: uid(), name: 'Ambient Interior Lighting', status: 'researching', priority: 'low', tier: 3, category: 'Cosmetic', estimatedCost: 40, actualCost: null, brand: 'Govee or EL wire kit', installType: 'DIY', notes: 'LED strip or EL wire lighting in footwells, door panels, and center console. App-controlled RGB color options. Adds a premium feel to nighttime driving. Govee kits connect via 12V or USB. Choose subtle white/blue for a classy OEM+ look or color-cycle for personality.', dateInstalled: null },
    { id: uid(), name: 'Chrome Delete Kit', status: 'researching', priority: 'low', tier: 3, category: 'Cosmetic', estimatedCost: 50, actualCost: null, brand: 'Bogar Tech Designs or VViViD vinyl', installType: 'DIY', notes: 'Precut gloss black vinyl covers the chrome trim around rear windows and any exterior chrome accents. Gives a blacked-out, modern aggressive look that complements dark paint colors. Bogar Tech kits are precut for the CX-50 — peel and stick. Removable with heat gun if you change your mind.', dateInstalled: null },
    { id: uid(), name: 'Shift Knob Replacement', status: 'researching', priority: 'low', tier: 3, category: 'Cosmetic', estimatedCost: 50, actualCost: null, brand: 'Mazda Skyactiv or aftermarket weighted', installType: 'DIY', notes: 'Replace the stock shift knob with a heavier, premium-feel alternative. Mazda Skyactiv knob from other models is a direct swap. Weighted knobs improve shift feel with smoother, more precise throws. Leather or aluminum options available. 2-min unscrew and replace.', dateInstalled: null },
    { id: uid(), name: 'Carbon Fiber Key Fob Shell', status: 'to-do', priority: 'low', tier: 3, category: 'Cosmetic', estimatedCost: 15, actualCost: null, brand: 'Generic (Amazon)', installType: 'DIY', notes: 'Carbon fiber pattern or colored shell replacement for the Mazda key fob. Snaps over the existing fob housing. Adds scratch protection and a custom look. Multiple color options — carbon fiber, matte black, red. Takes 2 minutes to swap. Cheap way to personalize something you touch every day.', dateInstalled: null },
    { id: uid(), name: 'Front Grille Guard / Insert', status: 'researching', priority: 'low', tier: 3, category: 'Cosmetic', estimatedCost: 35, actualCost: null, brand: 'Generic (Amazon)', installType: 'DIY', notes: 'Mesh or honeycomb grille insert fills the open grille area. Protects the radiator and intercooler from road debris, bugs, and rocks while adding a sportier look. Clips in behind the factory grille — 2-minute install, no tools. Especially useful in Florida with love bugs and highway debris.', dateInstalled: null },
    { id: uid(), name: 'Seat Covers (Front Row)', status: 'researching', priority: 'low', tier: 3, category: 'Protection', estimatedCost: 250, actualCost: null, brand: 'OEM Mazda Leatherette or Coverking', installType: 'DIY', notes: 'Custom-fit seat covers protect factory upholstery from Miami sun damage, sweat, and daily wear. OEM leatherette covers available (not compatible with ventilated seats). Coverking Cordura Ballistic for heavy-duty protection. Preserves resale value. Check compatibility with side airbags — always use SRS-compatible covers.', dateInstalled: null },
    { id: uid(), name: 'Navigation SD Card', status: 'to-do', priority: 'low', tier: 3, category: 'Comfort & Tech', estimatedCost: 40, actualCost: null, brand: 'Generic (Amazon)', installType: 'DIY', notes: 'Adds full OEM navigation to the infotainment display without needing phone data or CarPlay. Works exactly like the factory nav chip but costs ~$40 vs $400+ from Mazda. Plug into the SD slot in the center console. Useful as a backup when phone dies or in areas with poor cell signal.', dateInstalled: null },

    // ── Tier 4: Future / Optional — Deep Performance & Specialty ─
    { id: uid(), name: 'Oil Catch Can', status: 'researching', priority: 'low', tier: 4, category: 'Maintenance Upgrade', estimatedCost: 175, actualCost: null, brand: 'CorkSport or Mishimoto', installType: 'DIY', notes: 'Catches oil vapors before they re-enter the intake. Reduces carbon buildup over time on the turbo engine. CorkSport makes a direct-fit kit for CX-50. Requires periodic draining. Best for long-term engine health.', dateInstalled: null },
    { id: uid(), name: 'Rear Sway Bar Upgrade', status: 'researching', priority: 'low', tier: 4, category: 'Sound / Performance', estimatedCost: 250, actualCost: null, brand: 'CorkSport', installType: 'Shop', notes: 'CorkSport adjustable rear sway bar reduces body roll in corners. Noticeably sharper handling. Direct bolt-on replacement. Does not affect ride comfort. Best paired with quality tires.', dateInstalled: null },
    { id: uid(), name: 'Cabin Air Filter (Charcoal)', status: 'to-do', priority: 'low', tier: 4, category: 'Maintenance Upgrade', estimatedCost: 20, actualCost: null, brand: 'Bosch or EPAuto (activated carbon)', installType: 'DIY', notes: 'Upgrade from stock paper filter to activated charcoal. Filters odors, exhaust fumes, and allergens better — helpful in Miami traffic and humidity. Replace every 15k miles or annually. 5-min DIY via glove box.', dateInstalled: null },
    { id: uid(), name: 'Magnetic Oil Drain Plug', status: 'to-do', priority: 'low', tier: 4, category: 'Maintenance Upgrade', estimatedCost: 15, actualCost: null, brand: 'Dimple or generic', installType: 'DIY', notes: 'Catches metal shavings from engine wear. Cheap insurance for turbo engine longevity. Install at next oil change. One-time purchase, reuse forever.', dateInstalled: null },
    { id: uid(), name: 'Big Brake Kit (BBK)', status: 'researching', priority: 'low', tier: 4, category: 'Sound / Performance', estimatedCost: 1200, actualCost: null, brand: 'CorkSport', installType: 'Shop', notes: 'CorkSport 13-inch (330mm) rotors with 4-piston calipers replace the OEM setup. Includes stainless steel braided brake lines and all brackets/hardware. Actually ~6 lbs lighter per side than OEM turbo brakes despite being larger. Improved stopping power, shorter stopping distance, and better heat dissipation for spirited driving.', dateInstalled: null },
    { id: uid(), name: 'Lift Kit (1.5 inch)', status: 'researching', priority: 'low', tier: 4, category: 'Sound / Performance', estimatedCost: 400, actualCost: null, brand: 'HRG Off-road', installType: 'Shop', notes: 'HRG 1.5-inch lift raises ground clearance from 8.6 to ~10.1 inches without replacing coil springs — preserves Mazda\'s factory ride quality. Provides room for slightly larger tires (235/65R17). Protects undercarriage on rough roads. Popular with the overlanding community. Does not affect CVs or alignment at this height.', dateInstalled: null },
    { id: uid(), name: 'Painted Brake Calipers', status: 'researching', priority: 'low', tier: 4, category: 'Cosmetic', estimatedCost: 200, actualCost: null, brand: 'G2 Caliper Paint or Duplicolor', installType: 'DIY', notes: 'High-temp caliper paint in red, yellow, or custom color adds a pop behind the wheels. Also adds corrosion protection — important in Miami\'s salt air and coastal humidity. G2 kit includes cleaner, paint, and clear coat. Full DIY with wheel removal, ~2 hours for all four. Can also be done professionally for ~$350.', dateInstalled: null },
    { id: uid(), name: 'Fog Light Kit', status: 'researching', priority: 'low', tier: 4, category: 'Comfort & Tech', estimatedCost: 250, actualCost: null, brand: 'PIAA or aftermarket LED pods', installType: 'Shop', notes: 'CX-50 famously has NO factory fog lights — even on Turbo trims. LED pods in yellow/amber cut through fog and heavy rain much better than headlights alone. Mount low in the front bumper valance. Yellow light scatters less off water droplets. Important: do NOT tap into headlight wiring — CAN bus is temperamental. Use independent wiring harness with dash switch.', dateInstalled: null },
    { id: uid(), name: 'Hood Ditch Lights', status: 'researching', priority: 'low', tier: 4, category: 'Comfort & Tech', estimatedCost: 300, actualCost: null, brand: 'CorkSport brackets + Rigid D-Series', installType: 'DIY', notes: 'CorkSport hood light brackets mount LED pods at the hood corners near the A-pillars — also called "ditch lights." No drilling or trimming required. Pairs with Rigid D-Series spot or flood pods. Full wiring harness and switch included. Great for dark parking areas, camping, and off-road visibility. 30-min install.', dateInstalled: null },
    { id: uid(), name: 'Speaker Upgrade + Subwoofer', status: 'researching', priority: 'low', tier: 4, category: 'Comfort & Tech', estimatedCost: 500, actualCost: null, brand: 'JBL, Morel, or Kicker', installType: 'Shop', notes: 'Replace stock door speakers with higher quality drivers for clearer mids and highs. Add a compact 10-inch powered subwoofer under the driver seat or in the cargo area for bass. JBL Club A600 amp + 10" sub is a proven combo. Use Crutchfield for vehicle-specific fit guides and wiring harnesses. Bose-equipped models need signal tap from Bose amp outputs. Non-Bose models benefit most.', dateInstalled: null },
    { id: uid(), name: 'All-Terrain Tires', status: 'researching', priority: 'low', tier: 4, category: 'Sound / Performance', estimatedCost: 800, actualCost: null, brand: 'Falken Wildpeak AT Trail or BFG KO2', installType: 'Shop', notes: 'Falken Wildpeak AT Trail 235/65R17 is the forum favorite — great on-road manners with real off-road capability and excellent wet/winter traction. BFGoodrich KO2 for more aggressive off-road focus. Slight increase in road noise vs stock tires. Pairs perfectly with the 1.5" lift kit. Budget ~$800 for a full set of four mounted and balanced.', dateInstalled: null },
    { id: uid(), name: 'Aftermarket Wheels', status: 'researching', priority: 'low', tier: 4, category: 'Cosmetic', estimatedCost: 1000, actualCost: null, brand: 'Black Rhino, Fuel, or OZ Racing', installType: 'Shop', notes: 'Black Rhino 17x7.5 with 40mm offset is the most popular fitment — pairs with 235/65R17 AT tires. Fuel and OZ Racing also make CX-50-compatible wheels. Darker finishes (matte black, bronze) complement the rugged CX-50 styling. Budget ~$250/wheel. Always verify bolt pattern (5x114.3), hub bore (67.1mm), and offset before purchasing.', dateInstalled: null },
    { id: uid(), name: 'Sound Deadening / Insulation', status: 'researching', priority: 'low', tier: 4, category: 'Comfort & Tech', estimatedCost: 200, actualCost: null, brand: 'Dynamat or Kilmat', installType: 'DIY', notes: 'Butyl rubber sound deadening mats applied to doors, floor, and trunk reduce road noise and vibrations. Improves audio quality dramatically — speakers sound better in a quieter cabin. Kilmat is the budget-friendly alternative to Dynamat at ~60% less cost. Labor-intensive DIY (requires door panel and trim removal) but materials are cheap. Best done alongside a speaker upgrade.', dateInstalled: null },
  ];

  // ── Storage ──────────────────────────────────────────────────
  const store = {
    get(key) {
      try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
    },
    set(key, val) {
      localStorage.setItem(key, JSON.stringify(val));
    },
  };

  function getMaintenance() { return store.get(KEYS.maintenance) || []; }
  function getMods()        { return store.get(KEYS.mods)        || DEFAULT_MODS; }
  function getFuel()        { return store.get(KEYS.fuel)        || []; }
  function getVehicle() {
    const saved = store.get(KEYS.vehicle) || {};
    // Migrate legacy property names (tiresDriver/tiresPassenger → wiperDriver/wiperPassenger)
    if (saved.tiresDriver && !saved.wiperDriver) { saved.wiperDriver = saved.tiresDriver; delete saved.tiresDriver; }
    if (saved.tiresPassenger && !saved.wiperPassenger) { saved.wiperPassenger = saved.tiresPassenger; delete saved.tiresPassenger; }
    return { ...DEFAULT_VEHICLE, ...saved };
  }
  function getSettings()    { return store.get(KEYS.settings)    || {}; }
  function getDocuments()   { return store.get(KEYS.documents)   || {}; }

  function saveMaintenance(data) { store.set(KEYS.maintenance, data); }
  function saveMods(data)        { store.set(KEYS.mods, data); }
  function saveFuel(data)        { store.set(KEYS.fuel, data); }
  function saveVehicle(data)     { store.set(KEYS.vehicle, data); }
  function saveSettings(data)    { store.set(KEYS.settings, data); }
  function saveDocuments(data)   { store.set(KEYS.documents, data); }

  // ── Theme ────────────────────────────────────────────────────
  function initTheme() {
    // Theme is pre-applied in <head> to avoid FOUC; just sync the icon
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    _updateThemeIcon(current);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cx50_theme', next);
    _updateThemeIcon(next);
  }

  function _updateThemeIcon(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.innerHTML = theme === 'dark'
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:14px;height:14px;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:14px;height:14px;"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
  }

  // Seed mods on first run
  function seedIfNeeded() {
    if (!store.get(KEYS.mods)) store.set(KEYS.mods, DEFAULT_MODS);
  }

  // ── Export ───────────────────────────────────────────────────
  function exportData(type) {
    const dataMap = {
      maintenance: { data: getMaintenance(), filename: 'cx50-service-log.json' },
      mods:        { data: getMods(),        filename: 'cx50-mods-tracker.json' },
      fuel:        { data: getFuel(),        filename: 'cx50-fuel-log.json'     },
      all: {
        data: { maintenance: getMaintenance(), mods: getMods(), fuel: getFuel(), vehicle: getVehicle(), documents: getDocuments(), exportedAt: new Date().toISOString() },
        filename: 'cx50-garage-backup.json',
      },
    };
    const { data, filename } = dataMap[type] || dataMap.all;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast('Exported ' + filename);
  }

  // ── Import ───────────────────────────────────────────────────
  function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        let parsed;
        try {
          parsed = JSON.parse(ev.target.result);
        } catch {
          toast('Could not read file — is it a valid JSON backup?');
          return;
        }
        if (!parsed.maintenance && !parsed.mods && !parsed.fuel) {
          toast('Invalid file — not a CX-50 Garage backup.');
          return;
        }
        confirm('This will replace all current data with the backup. Continue?', () => {
          if (parsed.maintenance) saveMaintenance(parsed.maintenance);
          if (parsed.mods)        saveMods(parsed.mods);
          if (parsed.fuel)        saveFuel(parsed.fuel);
          if (parsed.vehicle)     saveVehicle(parsed.vehicle);
          if (parsed.documents)   saveDocuments(parsed.documents);
          toast('Backup restored ✓');
          navigate('dashboard');
        });
      };
      reader.readAsText(file);
    };
    input.click();
  }

  // ── Router ───────────────────────────────────────────────────
  let currentView = 'dashboard';

  function navigate(view) {
    currentView = view;
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.view === view);
    });
    const container = document.getElementById('view-container');
    switch (view) {
      case 'dashboard':   container.innerHTML = Views.dashboard();   break;
      case 'maintenance': container.innerHTML = Views.maintenance(); break;
      case 'mods':        container.innerHTML = Views.mods();        break;
      case 'fuel':        container.innerHTML = Views.fuel();        break;
      case 'reference':   container.innerHTML = Views.reference();   break;
      case 'documents':   container.innerHTML = Views.documents();   break;
    }
    container.scrollTop = 0;
    // Run each view's post-render setup
    if (window._postRenderHooks && window._postRenderHooks[view]) {
      window._postRenderHooks[view]();
    }
  }

  function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function formatCurrency(n) {
    if (n == null || n === '') return '—';
    return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }

  function formatMileage(n) {
    if (!n) return '—';
    return Number(n).toLocaleString('en-US') + ' mi';
  }

  function statusBadge(status) {
    const map = {
      'installed':    ['badge-green',  'Installed'],
      'to-do':        ['badge-blue',   'To Do'],
      'researching':  ['badge-gray',   'Researching'],
      'ready-to-buy': ['badge-amber',  'Ready to Buy'],
      'skipped':      ['badge-gray',   'Skipped'],
    };
    const [cls, label] = map[status] || ['badge-gray', status];
    return `<span class="badge ${cls}">${label}</span>`;
  }

  function priorityBadge(priority) {
    const map = {
      'high':   ['badge-red',   '↑ High'],
      'medium': ['badge-amber', '→ Med'],
      'low':    ['badge-gray',  '↓ Low'],
    };
    const [cls, label] = map[priority] || ['badge-gray', priority];
    return `<span class="badge ${cls}">${label}</span>`;
  }

  // ── Modal helpers ────────────────────────────────────────────
  function openModal(html) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'modal-overlay';
    overlay.innerHTML = `<div class="modal">${html}</div>`;
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal();
    });
    document.body.appendChild(overlay);
  }

  function closeModal() {
    const el = document.getElementById('modal-overlay');
    if (el) el.remove();
  }

  function confirm(message, onConfirm) {
    openModal(`
      <div class="modal-handle"></div>
      <div class="modal-header">
        <span class="modal-title">Confirm</span>
      </div>
      <div class="modal-body">
        <p style="font-size:15px; color:var(--text-secondary); line-height:1.5; margin-bottom:20px;">${message}</p>
        <button class="btn-destructive" style="margin-top:0;" onclick="(function(){ App.closeModal(); (${onConfirm.toString()})(); })()">Delete</button>
        <button onclick="App.closeModal()" style="
          width:100%; padding:14px; border:1px solid var(--border); border-radius:var(--radius-md);
          font-size:15px; font-weight:500; color:var(--text-secondary); font-family:var(--font-ui);
          background:var(--bg-card); margin-top:8px;
        ">Cancel</button>
      </div>
    `);
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    window._postRenderHooks = {};
    seedIfNeeded();
    initTheme();
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => navigate(btn.dataset.view));
    });
    navigate('dashboard');
  }

  // ── Public API ───────────────────────────────────────────────
  return {
    init, navigate, uid, toast, exportData, importData,
    formatDate, formatCurrency, formatMileage,
    statusBadge, priorityBadge,
    openModal, closeModal, confirm,
    getMaintenance, saveMaintenance,
    getMods, saveMods,
    getFuel, saveFuel,
    getVehicle, saveVehicle,
    getSettings, saveSettings,
    getDocuments, saveDocuments,
    toggleTheme,
  };
})();
