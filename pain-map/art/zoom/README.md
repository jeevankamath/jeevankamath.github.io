# Zoom drawings (hand-drawn style)

viewBox 0 0 320 400, transparent background. Each sub-location is a `<g class="sub" data-sub id="<region>--<slug>">` containing a `.hit` path; add class `sel` for the selected (yellow) state. data-muscle-id follows the `region.strand` scheme used in pain-map.html (existing ids reused where they exist; others are new, marked *).

## neck.svg — Neck (back view)

| data-sub | data-muscle-id |
|---|---|
| `skull-base` | `neck.suboccipitals` * |
| `back-centre` | `neck.cervical_paraspinals` * |
| `side-top-shoulder` | `neck.upper_trapezius` * |
| `into-arm` | — |

## elbow.svg — Elbow (front view, arm slightly bent)

| data-sub | data-muscle-id |
|---|---|
| `outer` | `elbow.common_extensor` * |
| `inner` | `elbow.common_flexor` * |
| `front-crease` | `elbow.distal_biceps` * |
| `point` | `elbow.triceps` * |
| `forearm` | `elbow.forearm_extensors` * |

## wrist-hand.svg — Wrist and hand (palm view)

| data-sub | data-muscle-id |
|---|---|
| `thumb-side-wrist` | `wrist.first_dorsal_compartment` * |
| `little-finger-wrist` | `wrist.tfcc` * |
| `back-of-wrist` | — |
| `palm-tingling` | `wrist.median_nerve` * |
| `thumb-base` | `wrist.thumb_cmc` * |
| `finger-joints` | — |
| `trigger-finger` | `wrist.flexor_tendon_a1` * |

## upper-back.svg — Upper and mid back (back view, front-chest inset)

| data-sub | data-muscle-id |
|---|---|
| `between-shoulder-blades` | `back.rhomboids` * |
| `beside-spine` | `back.erector_spinae` |
| `ribs-side` | `back.intercostals` * |
| `chest-wall-front` | — |

## hip-groin.svg — Hip and groin (front view, buttock inset)

| data-sub | data-muscle-id |
|---|---|
| `front-hip-crease` | `hip.iliopsoas` * |
| `outer-hip` | `hip.gluteus_medius` * |
| `inner-groin` | `hip.adductor_longus` * |
| `lower-tummy-lump` | — |
| `buttock` | `back.gluteal` |

## inner-thigh.svg — Inner thigh (front view)

| data-sub | data-muscle-id |
|---|---|
| `high` | `adductor.longus` * |
| `middle` | `adductor.gracilis` * |
| `lower` | `adductor.magnus` * |

## knee.svg — Knee (front view, back-of-knee inset)

| data-sub | data-muscle-id |
|---|---|
| `whole-knee-swollen` | — |
| `around-kneecap` | `knee.patellofemoral` |
| `below-kneecap` | `knee.patellar_tendon` * |
| `bump-below` | `knee.tibial_tuberosity` * |
| `inner` | `knee.medial` |
| `outer` | `knee.lateral` |
| `back-of-knee` | `knee.popliteal` * |

## shin-calf.svg — Shin (front view) and calf (back view)

| data-sub | data-muscle-id |
|---|---|
| `inner-shin-edge` | `shin.tibialis_posterior` * |
| `shin-bone-spot` | — |
| `front-outer-shin` | `shin.tibialis_anterior` * |
| `whole-calf-swollen` | — |
| `calf-upper-middle` | `calf.gastroc_medial` |
| `lower-calf` | `calf.soleus` |

## ankle-achilles.svg — Ankle and Achilles (outer view, inner-ankle inset)

| data-sub | data-muscle-id |
|---|---|
| `outer` | `ankle.atfl` |
| `behind-outer-bone` | `ankle.peroneals` |
| `front` | — |
| `achilles-mid` | `achilles.midportion` |
| `achilles-insertion` | `achilles.insertion` |
| `inner` | `ankle.deltoid` * |

## foot.svg — Foot (sole view, heel side inset)

| data-sub | data-muscle-id |
|---|---|
| `toes` | — |
| `big-toe-joint` | `foot.first_mtp` * |
| `ball-3rd-4th` | `foot.interdigital_nerve` * |
| `ball-other-toes` | — |
| `arch` | `foot.plantar_fascia` * |
| `outer-edge` | `ankle.peroneals` |
| `bottom-heel` | `foot.plantar_fascia_insertion` * |
| `back-heel-child` | `foot.calcaneal_apophysis` * |

## thigh-front.svg — Front and outer thigh (front view, right leg)

| data-sub | data-muscle-id |
|---|---|
| `front-upper` | `quad.rectus_femoris` * |
| `front-middle` | `quad.vastus_lateralis` * |
| `front-lower` | `quad.vastus_medialis` * |
| `outer` | `itb.iliotibial_band` * |

Also decorative strand outlines (`<g class="strand" data-strand>`, aria-hidden, no pointer events): quad.rectus_femoris, quad.vastus_lateralis, quad.vastus_medialis, itb.iliotibial_band. Page loads it as art/zoom/thigh-front.svg (REGIONS.thigh_front.art).

contact-sheet.png: all 11 generated drawings with one sub-location shown selected.
contact-sheet-insets.png: the second-view sub-locations selected.
