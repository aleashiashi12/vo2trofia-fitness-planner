
import { WorkoutData } from '../types';

export const initialData: WorkoutData = {
  "warmUps": {
    "fuerza": [
      { "id": "", "type": "warmup", "name": "Elevación del Ritmo Cardíaco", "details": "2 minutos de carrera en el sitio o saltos de tijera.", "duration": 120, "transition": 3, "cue": "Trote ligero en el sitio. Eleva las rodillas alternadamente." },
      { "id": "", "type": "warmup", "name": "Movilidad de Hombros", "details": "Círculos grandes y controlados con los brazos. (30s Total)", "duration": 30, "transition": 3, "cue": "...", 
        "parts": [
          { "name": "(Adelante)", "duration": 15, "cue": "Brazos rectos. Dibuja círculos grandes y lentos hacia adelante."},
          { "name": "(Atrás)", "duration": 15, "cue": "Cambia de dirección. Brazos rectos, círculos atrás."}
        ]},
      { "id": "", "type": "warmup", "name": "Movilidad de Columna", "details": "30 segundos de rotaciones de torso, de pie.", "duration": 30, "transition": 3, "cue": "Pies fijos al ancho de hombros. Gira el torso (no la cadera) de lado a lado." },
      { "id": "", "type": "warmup", "name": "Movilidad de Cadera (Círculos)", "details": "10 círculos hacia afuera con cada pierna. (40s Total)", "duration": 40, "transition": 3, "cue": "...",
        "parts": [
          { "name": "(Pierna Izquierda)", "duration": 20, "cue": "Apóyate. Sube rodilla izq, ábrela hacia afuera y abajo."},
          { "name": "(Pierna Derecha)", "duration": 20, "cue": "Cambia de pierna. Sube rodilla der, ábrela."}
        ]},
      { "id": "", "type": "warmup", "name": "Movilidad de Cadera (Balanceos)", "details": "10 balanceos adelante/atrás y lado/lado con cada pierna. (40s Total)", "duration": 40, "transition": 3, "cue": "...",
        "parts": [
          { "name": "(Pierna Izquierda)", "duration": 20, "cue": "Apóyate. Con pierna izq estirada, balancéala adelante y atrás."},
          { "name": "(Pierna Derecha)", "duration": 20, "cue": "Cambia de pierna. Pierna der estirada, balancéala."}
        ]},
      { "id": "", "type": "warmup", "name": "Activación de Patrón", "details": "15 repeticiones de sentadillas con peso corporal, lentas y profundas. (Aprox. 45 segundos)", "duration": 45, "transition": 3, "cue": "Imagina una silla. Cadera atrás, espalda recta. Baja profundo y sube controlado." },
      { "id": "", "type": "warmup", "name": "Activación Dinámica", "details": "5 estocadas con torsión por cada lado. (40s Total)", "duration": 40, "transition": 3, "cue": "...",
        "parts": [
          { "name": "(Lado Izquierdo)", "duration": 20, "cue": "Da un paso largo (zancada) con la izq. Gira tu torso hacia la izquierda."},
          { "name": "(Lado Derecho)", "duration": 20, "cue": "Alterna. Paso largo con la der. Gira tu torso a la derecha."}
        ]}
    ],
    "hiit": [
      { "id": "", "type": "warmup", "name": "Jumping Jacks", "details": "Comenzamos a elevar el ritmo cardíaco.", "duration": 45, "transition": 3, "cue": "Salta abriendo piernas y subiendo brazos. Salta cerrando todo." },
      { "id": "", "type": "warmup", "name": "Correr en el Sitio / Rodillas Altas", "details": "Mantén el ritmo, rodillas arriba.", "duration": 45, "transition": 3, "cue": "Ritmo rápido. Sube las rodillas lo más alto que puedas, alterna brazos." },
      { "id": "", "type": "warmup", "name": "Sentadillas con Peso Corporal", "details": "Baja profundo, movimiento controlado.", "duration": 30, "transition": 3, "cue": "Cadera atrás, pecho erguido. Baja hasta que la cadera supere las rodillas." },
      { "id": "", "type": "warmup", "name": "Burpees (sin flexión/salto)", "details": "Plancha, vuelve y de pie. Ritmo constante.", "duration": 30, "transition": 3, "cue": "Agáchate, manos al suelo. Salta con pies a plancha. Salta con pies a manos. Levántate." },
      { "id": "", "type": "warmup", "name": "Recuperar", "details": "Respira. El siguiente bloque es movilidad.", "duration": 15, "transition": 3, "cue": "Respira profundo, camina un poco." },
      { "id": "", "type": "warmup", "name": "Balanceos de Piernas (Frontal/Atrás)", "details": "10 por pierna. Apóyate si es necesario. (40s Total)", "duration": 40, "transition": 3, "cue": "...",
        "parts": [
          { "name": "(Pierna Izquierda)", "duration": 20, "cue": "Apóyate. Pierna izq estirada. Balancéala de adelante (patada) hacia atrás."},
          { "name": "(Pierna Derecha)", "duration": 20, "cue": "Cambia de pierna. Pierna der estirada, balancéala."}
        ]},
      { "id": "", "type": "warmup", "name": "Círculos con los Brazos", "details": "15s hacia adelante, 15s hacia atrás. Grandes. (30s Total)", "duration": 30, "transition": 3, "cue": "...",
        "parts": [
          { "name": "(Adelante)", "duration": 15, "cue": "Brazos rectos. Dibuja círculos amplios. 15s adelante."},
          { "name": "(Atrás)", "duration": 15, "cue": "Cambia de dirección. 15s atrás."}
        ]},
      { "id": "", "type": "warmup", "name": "Sentadilla Profunda con Rotación", "details": "5 por lado. Baja, codo a rodilla, rota abriendo el pecho. (40s Total)", "duration": 40, "transition": 3, "cue": "...",
        "parts": [
          { "name": "(Lado Izquierdo)", "duration": 20, "cue": "En cuclillas. Codo der en rodilla der. Gira y abre pecho izq al techo."},
          { "name": "(Lado Derecho)", "duration": 20, "cue": "Cambia de lado. Codo izq en rodilla izq. Gira y abre pecho der."}
        ]},
      { "id": "", "type": "warmup", "name": "Toma la Barra (Vacía)", "details": "Prepara la barra vacía (5kg). El último bloque.", "duration": 10, "transition": 3, "cue": "Posiciónate con la barra vacía." },
      { "id": "", "type": "warmup", "name": "5 Sentadillas Frontales", "details": "Lento y controlado. Codos arriba.", "duration": 15, "transition": 3, "cue": "Barra sobre hombros, codos apuntando al frente. Baja profundo (sentadilla)." },
      { "id": "", "type": "warmup", "name": "5 Press Estricto", "details": "Aprieta abdomen. Empuja sobre la cabeza.", "duration": 15, "transition": 3, "cue": "Barra en hombros. Aprieta abdomen/glúteos. Empuja la barra recto sobre tu cabeza." },
      { "id": "", "type": "warmup", "name": "5 Push Press", "details": "Ligero impulso de piernas.", "duration": 15, "transition": 3, "cue": "Ligera flexión de rodillas (dip). Extiende caderas y piernas, usa ese impulso para empujar la barra arriba." },
      { "id": "", "type": "warmup", "name": "5 Thrusters", "details": "Sentadilla + Empuje. Controlado.", "duration": 20, "transition": 3, "cue": "Haz una sentadilla frontal completa. Al subir, explota y usa el impulso para hacer un Push Press." }
    ]
  },
  "days": {
    "lunes": {
      "dayName": "Lunes",
      "title": "Día 1: Torso (Empuje) 🏋️‍♂️",
      "warmUpType": "fuerza",
      "requiresExercise": true,
      "requiresSteps": true,
      "stepGoal": 10000,
      "steps": [
        { "id": "", "type": "exercise", "name": "Press Militar con Barra (de pie)", "sets": 4, "reps": "6-10", "rest": 90, 
          "technique": "1. **Posición Inicial:** Coloca la barra en el suelo. Cárgala con un peso ligero. Ponte en cuclillas y levántala hasta tus hombros (posición de front squat/clean).\n2. **Agarre:** Sujeta la barra un poco más ancha que tus hombros, con las palmas mirando hacia adelante. Los codos deben apuntar ligeramente al frente.\n3. **Núcleo:** De pie, con los pies a la anchura de los hombros, aprieta fuertemente el abdomen y los glúteos. Esto es clave para proteger tu espalda.\n4. **Empuje:** Respira hondo y empuja la barra recto hacia el techo. La barra debe pasar cerca de tu cara. Al final, \"mete\" la cabeza ligeramente hacia adelante para que la barra quede alineada sobre tu columna y hombros, con los brazos totalmente extendidos.\n5. **Descenso:** Baja la barra de forma controlada, rozando tu barbilla, hasta que descanse de nuevo sobre la parte alta de tu pecho/hombros. Repite.", 
          "progression": "Cuando completes 10 reps en todas las series, aumenta el peso (añade discos pequeños)." },
        
        { "id": "", "type": "exercise", "name": "Flexiones con Chaleco Lastrado", "sets": 4, "reps": "8-15", "rest": 90, 
          "technique": "1. **Preparación:** Ponte el chaleco de 10 kg y ajústalo bien.\n2. **Posición Inicial:** Colócate en posición de plancha alta (manos en el suelo, brazos extendidos), con las manos un poco más ancha que tus hombros.\n3. **Alineación:** Tu cuerpo debe formar una línea recta desde la cabeza hasta los talones. Aprieta el abdomen y los glúteos. No dejes que tu cadera se hunda ni se eleve.\n4. **Descenso:** Dobla los codos (apuntando ligeramente hacia atrás, no 90 grados hacia los lados) y baja el pecho hasta que casi toque el suelo.\n5. **Empuje:** Empuja el suelo con fuerza para volver a la posición inicial, extendiendo los brazos por completo.", 
          "progression": "Aumenta las repeticiones. Si llegas a 15 reps en todas las series, prueba progresiones como pies elevados sobre la caja." },
        
        { "id": "", "type": "exercise", "name": "Fondos en Sillas (con Chaleco Lastrado)", "sets": 3, "reps": "8-15", "rest": 75, 
          "technique": "1. **Preparación:** Ponte el chaleco de 10 kg. Necesitarás tu caja o una silla muy estable.\n2. **Posición:** Siéntate en el borde de la caja/silla. Coloca las manos en el borde a cada lado de tu cadera, con los dedos apuntando hacia adelante.\n3. **Inicio:** Desliza tu trasero fuera de la caja. Apoya tu peso en tus manos. Puedes dejar las piernas flexionadas (más fácil) o estiradas (más difícil).\n4. **Descenso:** Dobla los codos (apuntando recto hacia atrás) y baja tu cuerpo hasta que tus hombros estén a la altura de tus codos (formando 90 grados). Mantén el pecho erguido y la espalda cerca de la caja.\n5. **Empuje:** Empuja con la palma de tus manos, concentrándote en estirar los tríceps (la parte trasera del brazo) para volver a la posición inicial.", 
          "progression": "Aumenta las repeticiones. Si lo haces con piernas flexionadas, prueba a estirarlas." },
        
        { "id": "", "type": "exercise", "name": "Press Francés en Suelo con Barra", "sets": 3, "reps": "8-12", "rest": 60, 
          "technique": "1. **Posición Inicial:** Túmbate boca arriba en el suelo. Dobla las rodillas y apoya los pies en el suelo para estabilizar la espalda.\n2. **Agarre:** Sujeta la barra (puedes usar la barra sola o con discos pequeños) con un agarre estrecho (manos a unos 15-20 cm de distancia).\n3. **Inicio:** Extiende los brazos rectos sobre tu pecho, perpendicular al suelo.\n4. **Descenso:** Manteniendo los codos fijos y apuntando al techo, dobla *únicamente* los codos para bajar la barra lentamente hacia tu frente o justo por encima de tu cabeza.\n5. **Extensión:** Sin mover la parte superior de tus brazos, extiende los codos para volver a subir la barra, apretando con fuerza los tríceps. Los codos no deben abrirse hacia los lados.", 
          "progression": "Aumenta el peso en la barra (discos pequeños)." },
        
        { "id": "", "type": "exercise", "name": "Elevaciones Laterales (con discos)", "sets": 3, "reps": "12-20", "rest": 60, 
          "technique": "1. **Posición Inicial:** De pie, con los pies firmes. Sostén un disco de peso ligero (ej. 2.5 kg o 5 kg) en cada mano, con las palmas mirando hacia tu cuerpo.\n2. **Postura:** Mantén una ligera flexión en los codos, como si abrazaras un barril grande.\n3. **Elevación:** Sin usar impulso ni balancear el cuerpo, levanta los brazos hacia los lados. Imagina que empujas las paredes.\n4. **Pico:** Sube solo hasta que tus manos estén a la altura de tus hombros (brazos paralelos al suelo). Aprieta un segundo.\n5. **Descenso:** Baja los discos de forma lenta y controlada. No dejes que simplemente caigan.", 
          "progression": "Aumenta las repeticiones. Concéntrate en la lentitud del movimiento." }
      ],
      "final": { "type": "cardio", "name": "Base Aeróbica (Pasos)", "details": "Completar 10,000 pasos en Zona 2." }
    },
    "martes": {
      "dayName": "Martes",
      "title": "Día 2: Piernas y Núcleo 🦵",
      "warmUpType": "fuerza",
      "requiresExercise": true,
      "requiresSteps": true,
      "stepGoal": 4000,
      "steps": [
        { "id": "", "type": "exercise", "name": "Sentadilla con Barra", "sets": 4, "reps": "6-10", "rest": 120, 
          "technique": "1. **Levantar la Barra (sin rack):** Carga la barra en el suelo. Levántala primero a tus hombros (como en el Press Militar) y luego, con cuidado, empújala sobre tu cabeza y déjala descansar sobre tus trapecios (músculos del cuello/espalda), NO sobre las vértebras del cuello.\n2. **Posición:** Pies a la anchura de los hombros, puntas ligeramente hacia afuera. Pecho erguido, mirada al frente.\n3. **Descenso:** Inicia el movimiento empujando la cadera hacia atrás y luego doblando las rodillas, como si fueras a sentarte en una silla. Mantén la espalda recta.\n4. **Profundidad:** Baja hasta que tu cadera esté por debajo de tus rodillas (romper el paralelo). Asegúrate de que tus rodillas sigan la dirección de tus pies (que no se metan hacia adentro).\n5. **Ascenso:** Empuja el suelo con toda la planta del pie (especialmente talones) para subir. Aprieta los glúteos al llegar arriba.", 
          "progression": "Aumenta el peso cuando completes 10 reps en todas las series." },
        
        { "id": "", "type": "exercise", "name": "Peso Muerto Rumano con Barra", "sets": 4, "reps": "8-12", "rest": 90, 
          "technique": "1. **Posición Inicial:** De pie, con la barra en tus manos y un agarre a la anchura de los hombros. Tus pies están a la anchura de la cadera.\n2. **Postura:** Mantén una *ligera* flexión en las rodillas (casi rectas, pero no bloqueadas). Espalda completamente recta y pecho erguido.\n3. **Descenso:** Empuja tu cadera *hacia atrás* como si quisieras tocar la pared de atrás con el trasero. La barra debe deslizarse por tus muslos y espinillas.\n4. **Límite:** Baja hasta que sientas un fuerte estiramiento en los isquiotibiales (parte trasera de la pierna), o hasta que tu espalda empiece a redondearse (¡no la redondees!).\n5. **Ascenso:** Invierte el movimiento. Empuja la cadera *hacia adelante* y aprieta los glúteos con fuerza para volver a la posición inicial.", 
          "progression": "Aumenta el peso en la barra." },
        
        { "id": "", "type": "exercise", "name": "Zancadas (con Barra o Chaleco)", "sets": 3, "reps": "8-12 por pierna", "rest": 75, 
          "technique": "1. **Preparación:** Ponte el chaleco de 10 kg o coloca la barra sobre tus trapecios (como en la sentadilla).\n2. **Paso:** Da un paso largo hacia adelante.\n3. **Descenso:** Baja el cuerpo de forma vertical hasta que tu rodilla trasera esté casi tocando el suelo. Ambas rodillas deben formar ángulos de 90 grados.\n4. **Estabilidad:** Mantén el torso erguido y el abdomen apretado. El peso debe estar en el talón de tu pie delantero.\n5. **Ascenso:** Empuja con fuerza con el pie delantero para volver a la posición inicial. Alterna la pierna en cada repetición.", 
          "progression": "Aumenta el peso (en la barra) o las repeticiones." },
        
        { "id": "", "type": "exercise", "name": "Hip Thrust con Barra", "sets": 4, "reps": "10-15", "rest": 75, 
          "technique": "1. **Posición:** Siéntate en el suelo con la parte superior de tu espalda (justo debajo de los omóplatos) apoyada contra el borde de tu caja.\n2. **Colocar la Barra:** Rueda la barra (con discos) sobre tus piernas hasta que quede justo sobre tu cadera. Puedes usar una toalla doblada debajo de la barra si te molesta.\n3. **Inicio:** Dobla las rodillas y apoya los pies en el suelo.\n4. **Empuje:** Empuja con los talones y levanta la cadera del suelo. Tu cuerpo debe formar una línea recta desde tus hombros (en la caja) hasta tus rodillas.\n5. **Contracción:** Aprieta los glúteos con todas tus fuerzas en la parte alta. Mantén la barbilla pegada al pecho.\n6. **Descenso:** Baja la cadera de forma controlada casi hasta el suelo y repite.", 
          "progression": "Aumenta el peso en la barra." },
        
        { "id": "", "type": "exercise", "name": "Plancha con Chaleco Lastrado", "sets": 3, "reps": "45-75 segundos", "rest": 60, 
          "technique": "1. **Preparación:** Ponte el chaleco de 10 kg.\n2. **Posición:** Túmbate boca abajo y apoya tu peso sobre tus antebrazos y las puntas de tus pies. Los codos deben estar justo debajo de los hombros.\n3. **Alineación Perfecta:** Tu cuerpo debe ser una tabla. Aprieta el abdomen (como si fueras a recibir un golpe) y los glúteos.\n4. **Clave:** No dejes que tu cadera se hunda hacia el suelo ni que tu trasero se levante. Mira al suelo para mantener el cuello alineado. Aguanta esa posición.", 
          "progression": "Aumenta la duración. Si llegas a 75s, puedes probar a levantar un pie del suelo por turnos." }
      ],
      "final": { "type": "cardio", "name": "Recuperación Activa (Pasos)", "details": "Completar ~4,000 pasos en Zona 1 (para DOMS)." }
    },
    "miercoles": {
      "dayName": "Miércoles",
      "title": "Descanso Activo 🚶‍♂️",
      "warmUpType": null,
      "requiresExercise": false,
      "requiresSteps": true,
      "stepGoal": 10000,
      "steps": [
        { "id": "", "type": "activity", "name": "Descanso Activo (Pasos)", "details": "Realizar 10,000 pasos (Zona 1/2) para construir base aeróbica." }
      ]
    },
    "jueves": {
      "dayName": "Jueves",
      "title": "Día 3: Torso (Tracción) 🏋️‍♂️",
      "warmUpType": "fuerza",
      "requiresExercise": true,
      "requiresSteps": true,
      "stepGoal": 10000,
      "steps": [
        { "id": "", "type": "exercise", "name": "Remo con Barra", "sets": 4, "reps": "6-10", "rest": 90, 
          "technique": "1. **Posición Inicial:** De pie, con la barra en el suelo. Inclina tu torso hacia adelante desde la cadera, manteniendo la espalda *completamente recta*. El torso debe quedar a unos 45 grados (o casi paralelo al suelo).\n2. **Agarre:** Sujeta la barra con las palmas mirando hacia tu cuerpo, un poco más ancho que tus hombros.\n3. **Tirón (Remo):** Tira de la barra hacia tu abdomen. Inicia el movimiento \"remando\" con los codos y apretando los omóplatos (juntando las paletillas).\n4. **Pico:** La barra debe tocar tu estómago o la parte baja del pecho. Aprieta la espalda.\n5. **Descenso:** Baja la barra de forma controlada hasta que tus brazos estén completamente extendidos, sin perder la postura de la espalda.", 
          "progression": "Aumenta el peso en la barra." },
        
        { "id": "", "type": "exercise", "name": "Dominadas (con Chaleco si es posible)", "sets": 4, "reps": "al fallo", "rest": 90, 
          "technique": "(Se asume que tienes una barra de dominadas en casa).\n1. **Preparación:** Si ya puedes hacer 8-10 dominadas limpias, ponte el chaleco de 10 kg. Si no, hazlas con tu peso corporal.\n2. **Agarre:** Sujeta la barra con las palmas mirando *hacia afuera* (agarre prono), un poco más ancho que tus hombros.\n3. **Inicio:** Cuelga de la barra con los brazos completamente extendidos.\n4. **Tirón:** Inicia el movimiento retrayendo los hombros (juntando omóplatos) y tira de tu cuerpo hacia arriba, pensando en llevar el pecho a la barra.\n5. **Pico:** Sube hasta que tu barbilla sobrepase claramente la barra.\n6. **Descenso:** Baja de forma controlada (no te dejes caer) hasta que tus brazos estén rectos de nuevo.", 
          "progression": "Aumenta las repeticiones totales. Si haces más de 12-15 sin chaleco, añade el chaleco." },
        
        { "id": "", "type": "exercise", "name": "Remo Invertido", "sets": 3, "reps": "8-15", "rest": 75, 
          "technique": "1. **Preparación:** Coloca la barra vacía sobre dos sillas estables (o usa el borde de una mesa muy resistente).\n2. **Posición:** Métete debajo de la barra/mesa. Sujétala con las palmas hacia ti (supino) o hacia afuera (prono), a la anchura de los hombros.\n3. **Alineación:** Forma una línea recta desde tus talones hasta tu cabeza, apoyándote solo en los talones. Aprieta abdomen y glúteos.\n4. **Tirón:** Tira de tu pecho hacia la barra/mesa, apretando los omóplatos.\n5. **Descenso:** Baja controlado.\n**Dificultad:** Cuanto más horizontal estés (pies más lejos), más difícil. Si flexionas las rodillas, es más fácil.", 
          "progression": "Aumenta las repeticiones. Para más dificultad, estira las piernas o elévalas sobre otra silla/caja." },
        
        { "id": "", "type": "exercise", "name": "Curl de Bíceps con Barra", "sets": 3, "reps": "8-12", "rest": 60, 
          "technique": "1. **Posición:** De pie, con la espalda recta y el abdomen apretado. Sujeta la barra con las palmas mirando *hacia arriba* (agarre supino), a la anchura de tus hombros.\n2. **Codos Fijos:** Fija tus codos a los costados de tu cuerpo. NO deben moverse hacia adelante o atrás durante el ejercicio.\n3. **Subida:** Dobla los codos para levantar la barra hacia tus hombros. Aprieta los bíceps con fuerza en la parte alta. No uses la espalda ni el impulso para balancear la barra.\n4. **Descenso:** Baja la barra de forma lenta y controlada hasta que tus brazos estén casi completamente extendidos. Siente el estiramiento.", 
          "progression": "Aumenta el peso en la barra." },
        
        { "id": "", "type": "exercise", "name": "Plancha Lateral", "sets": 3, "reps": "30-45 segundos por lado", "rest": 45, 
          "technique": "1. **Posición:** Túmbate de lado en el suelo.\n2. **Apoyo:** Apoya tu peso sobre tu antebrazo (codo justo debajo del hombro) y el borde exterior de tu pie de abajo.\n3. **Alineación:** Levanta la cadera del suelo hasta que tu cuerpo forme una línea recta perfecta desde la cabeza hasta los pies.\n4. **Clave:** No dejes que la cadera se caiga. Aprieta los abdominales oblicuos (el costado). Puedes poner la mano libre en tu cadera o extenderla al techo.", 
          "progression": "Aumenta la duración. Si llegas a 45s, intenta levantar la pierna de arriba." }
      ],
      "final": { "type": "cardio", "name": "Base Aeróbica (Pasos)", "details": "Completar 10,000 pasos en Zona 2." }
    },
    "viernes": {
      "dayName": "Viernes",
      "title": "Sesión HIIT 4x4 (El Complejo) 🔥",
      "warmUpType": "hiit",
      "requiresExercise": true,
      "requiresSteps": false,
      "stepGoal": 0,
      "steps": [
        { "id": "", "type": "hiit", "name": "HIIT 4x4: \"El Complejo\"", "rounds": 4, "workTime": 240, "restTime": 180,
          "exercises": [
              "5 x Peso Muerto Rumano",
              "5 x Hang Power Clean (Cargada Colgante)",
              "5 x Sentadilla Frontal",
              "5 x Push Press"
          ],
          "progression": "El objetivo es aumentar la potencia. Registra el número total de repeticiones del Complejo completadas en cada sesión. Si te estancas por 2-3 semanas, considera añadir un quinto intervalo." },
        { "id": "", "type": "cooldown", "name": "Vuelta a la Calma", "details": "5-10 minutos de estiramientos estáticos y movimiento ligero." }
      ],
      "final": { "type": "cardio", "name": "Recuperación Metabólica (Pasos)", "details": "Día ligero, completar < 5,000 pasos." }
    },
    "sabado": {
      "dayName": "Sábado",
      "title": "Día 4: Cuerpo Completo Funcional 💪",
      "warmUpType": "fuerza",
      "requiresExercise": true,
      "requiresSteps": true,
      "stepGoal": 4000,
      "steps": [
        { "id": "", "type": "exercise", "name": "Paseo del Granjero (Farmer's Walk)", "sets": 4, "reps": "45 segundos de caminata", "rest": 90, 
          "technique": "1. **Preparación:** Usa los objetos más pesados que puedas cargar con seguridad. Ejemplo: El saco de 15 kg en una mano y la caja de 20 kg en la otra (si puedes agarrarla) o discos pesados.\n2. **Levantamiento:** Levanta las cargas del suelo usando las piernas (como un peso muerto), no la espalda.\n3. **Postura:** De pie, mantén el pecho erguido, hombros hacia atrás y abdomen apretado.\n4. **Caminata:** Camina dando pasos cortos y controlados. Lucha por mantenerte totalmente vertical, sin inclinarte hacia un lado.\n5. **Objetivo:** Aguanta el agarre y la postura durante el tiempo indicado.", 
          "progression": "Aumenta el tiempo de caminata o usa más peso (ej. discos más pesados)." },
        
        { "id": "", "type": "exercise", "name": "Peso Muerto con Barra", "sets": 3, "reps": "5-8", "rest": 120, 
          "technique": "1. **Posición Inicial:** Coloca la barra cargada en el suelo. Acércate hasta que tus espinillas casi la toquen. Pies a la anchura de la cadera.\n2. **Agarre:** Agáchate (empujando cadera atrás, espalda recta) y agarra la barra con las manos justo por fuera de tus piernas.\n3. **Tensión:** Mantén la espalda *totalmente recta*, el pecho erguido y \"tira\" de la barra (sin levantarla) para crear tensión.\n4. **Levantamiento:** Empuja el suelo con tus piernas y extiende tu cadera y rodillas al mismo tiempo. La barra debe subir pegada a tus espinillas y muslos.\n5. **Final:** Termina de pie, erguido, apretando los glúteos.\n6. **Descenso:** Baja la barra de forma controlada, empujando la cadera hacia atrás primero y luego doblando las rodillas.", 
          "progression": "Aumenta el peso en la barra." },
        
        { "id": "", "type": "exercise", "name": "Empuje Isométrico contra Tanque", "sets": 4, "reps": "15 segundos de empuje máximo", "rest": 60, 
          "technique": "1. **Objeto:** Busca una pared sólida o un objeto que sea imposible de mover (como el \"tanque\" que mencionas).\n2. **Posición:** Colócate frente a la pared en una posición atlética: pies separados, rodillas ligeramente flexionadas, torso inclinado un poco hacia adelante.\n3. **Contacto:** Coloca tus manos en la pared a la altura del pecho.\n4. **Empuje:** Tensa todo tu cuerpo (abdomen, glúteos, piernas) y empieza a empujar la pared con toda tu fuerza, como si quisieras derribarla.\n5. **Intención:** Concéntrate en empujar. La fuerza debe venir de tu pecho, hombros y tríceps, transferida desde tus pies. Mantén la tensión máxima durante el tiempo indicado.", 
          "progression": "Aumenta la duración del empuje. Empuja más fuerte." },
        
        { "id": "", "type": "exercise", "name": "Burpees (con Chaleco Lastrado)", "sets": 3, "reps": "8-12", "rest": 75, 
          "technique": "1. **Preparación:** Ponte el chaleco de 10 kg.\n2. **Paso 1 (Cuclillas):** Desde de pie, agáchate y pon las manos en el suelo, justo delante de tus pies.\n3. **Paso 2 (Plancha):** Salta con ambos pies hacia atrás para aterrizar en una posición de plancha alta.\n4. **Paso 3 (Flexión):** Realiza una flexión completa, bajando el pecho hasta el suelo.\n5. **Paso 4 (Vuelta):** Sube de la flexión y salta con ambos pies hacia adelante, volviendo a la posición de cuclillas.\n6. **Paso 5 (Salto):** Salta verticalmente lo más alto que puedas, extendiendo los brazos sobre la cabeza. Aterriza y repite.", 
          "progression": "Aumenta las repeticiones." },
        
        { "id": "", "type": "exercise", "name": "Giros Rusos (Russian Twists)", "sets": 3, "reps": "15-20 por lado", "rest": 60, 
          "technique": "1. **Posición:** Siéntate en el suelo. Sostén un disco (2.5 o 5 kg) con ambas manos.\n2. **Equilibrio:** Inclina tu torso hacia atrás unos 45 grados y levanta los pies del suelo. Encuentra el equilibrio sobre tus glúteos. (Si es muy difícil, apoya los talones).\n3. **Giro:** Manteniendo el abdomen apretado, gira tu torso y toca el disco en el suelo a tu lado derecho.\n4. **Giro (Otro lado):** Gira completamente hacia el otro lado y toca el suelo a tu lado izquierdo.\n5. **Clave:** El movimiento debe venir de la rotación de tu torso, no solo de mover los brazos.", 
          "progression": "Aumenta las repeticiones o usa un disco más pesado." }
      ],
      "final": { "type": "cardio", "name": "Recuperación Activa (Pasos)", "details": "Completar ~4,000 pasos en Zona 1 (para DOMS)." }
    },
    "domingo": {
      "dayName": "Domingo",
      "title": "Descanso Activo 🚶‍♂️",
      "warmUpType": null,
      "requiresExercise": false,
      "requiresSteps": true,
      "stepGoal": 10000,
      "steps": [
        { "id": "", "type": "activity", "name": "Descanso Activo (Pasos)", "details": "Realizar 10,000 pasos (Zona 1/2) para construir base aeróbica." }
      ]
    }
  }
}
