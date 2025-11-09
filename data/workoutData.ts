
import { WorkoutData } from '../types';

export const workoutData: WorkoutData = {
  "warmUps": {
    "fuerza": [
      { "id": "", "type": "warmup", "name": "Elevación del Ritmo Cardíaco", "details": "2 minutos de carrera en el sitio o saltos de tijera.", "duration": 120, "transition": 3, "cue": "Trote ligero en el sitio. Eleva las rodillas alternadamente." },
      { "id": "", "type": "warmup", "name": "Movilidad de Hombros", "details": "Círculos grandes y controlados con los brazos. (30s Total)", "duration": 30, "transition": 3, "cue": "...",
        "parts": [
          { "name": "(Adelante)", "duration": 15, "cue": "Brazos rectos. Dibuja círculos grandes y lentos hacia adelante." },
          { "name": "(Atrás)", "duration": 15, "cue": "Cambia de dirección. Brazos rectos, círculos atrás." }
        ]
      },
      { "id": "", "type": "warmup", "name": "Movilidad de Columna", "details": "30 segundos de rotaciones de torso, de pie.", "duration": 30, "transition": 3, "cue": "Pies fijos al ancho de hombros. Gira el torso (no la cadera) de lado a lado." },
      { "id": "", "type": "warmup", "name": "Movilidad de Cadera (Círculos)", "details": "10 círculos hacia afuera con cada pierna. (40s Total)", "duration": 40, "transition": 3, "cue": "...",
        "parts": [
          { "name": "(Pierna Izquierda)", "duration": 20, "cue": "Apóyate. Sube rodilla izq, ábrela hacia afuera y abajo." },
          { "name": "(Pierna Derecha)", "duration": 20, "cue": "Cambia de pierna. Sube rodilla der, ábrela." }
        ]
      },
      { "id": "", "type": "warmup", "name": "Movilidad de Cadera (Balanceos)", "details": "10 balanceos adelante/atrás y lado/lado con cada pierna. (40s Total)", "duration": 40, "transition": 3, "cue": "...",
        "parts": [
          { "name": "(Pierna Izquierda)", "duration": 20, "cue": "Apóyate. Con pierna izq estirada, balancéala adelante y atrás." },
          { "name": "(Pierna Derecha)", "duration": 20, "cue": "Cambia de pierna. Pierna der estirada, balancéala." }
        ]
      },
      { "id": "", "type": "warmup", "name": "Activación de Patrón", "details": "15 repeticiones de sentadillas con peso corporal, lentas y profundas. (Aprox. 45 segundos)", "duration": 45, "transition": 3, "cue": "Imagina una silla. Cadera atrás, espalda recta. Baja profundo y sube controlado." },
      { "id": "", "type": "warmup", "name": "Activación Dinámica", "details": "5 estocadas con torsión por cada lado. (40s Total)", "duration": 40, "transition": 3, "cue": "...",
        "parts": [
          { "name": "(Lado Izquierdo)", "duration": 20, "cue": "Da un paso largo (zancada) con la izq. Gira tu torso hacia la izquierda." },
          { "name": "(Lado Derecho)", "duration": 20, "cue": "Alterna. Paso largo con la der. Gira tu torso a la derecha." }
        ]
      }
    ],
    "hiit": [
      { "id": "", "type": "warmup", "name": "Jumping Jacks", "details": "Comenzamos a elevar el ritmo cardíaco.", "duration": 45, "transition": 3, "cue": "Salta abriendo piernas y subiendo brazos. Salta cerrando todo." },
      { "id": "", "type": "warmup", "name": "Correr en el Sitio / Rodillas Altas", "details": "Mantén el ritmo, rodillas arriba.", "duration": 45, "transition": 3, "cue": "Ritmo rápido. Sube las rodillas lo más alto que puedas, alterna brazos." },
      { "id": "", "type": "warmup", "name": "Sentadillas con Peso Corporal", "details": "Baja profundo, movimiento controlado.", "duration": 30, "transition": 3, "cue": "Cadera atrás, pecho erguido. Baja hasta que la cadera supere las rodillas." },
      { "id": "", "type": "warmup", "name": "Burpees (sin flexión/salto)", "details": "Plancha, vuelve y de pie. Ritmo constante.", "duration": 30, "transition": 3, "cue": "Agáchate, manos al suelo. Salta con pies a plancha. Salta con pies a manos. Levántate." },
      { "id": "", "type": "warmup", "name": "Recuperar", "details": "Respira. El siguiente bloque es movilidad.", "duration": 15, "transition": 3, "cue": "Respira profundo, camina un poco." },
      { "id": "", "type": "warmup", "name": "Balanceos de Piernas (Frontal/Atrás)", "details": "10 por pierna. Apóyate si es necesario. (40s Total)", "duration": 40, "transition": 3, "cue": "...",
        "parts": [
          { "name": "(Pierna Izquierda)", "duration": 20, "cue": "Apóyate. Pierna izq estirada. Balancéala de adelante (patada) hacia atrás." },
          { "name": "(Pierna Derecha)", "duration": 20, "cue": "Cambia de pierna. Pierna der estirada, balancéala." }
        ]
      },
      { "id": "", "type": "warmup", "name": "Círculos con los Brazos", "details": "15s hacia adelante, 15s hacia atrás. Grandes. (30s Total)", "duration": 30, "transition": 3, "cue": "...",
        "parts": [
          { "name": "(Adelante)", "duration": 15, "cue": "Brazos rectos. Dibuja círculos amplios. 15s adelante." },
          { "name": "(Atrás)", "duration": 15, "cue": "Cambia de dirección. 15s atrás." }
        ]
      },
      { "id": "", "type": "warmup", "name": "Sentadilla Profunda con Rotación", "details": "5 por lado. Baja, codo a rodilla, rota abriendo el pecho. (40s Total)", "duration": 40, "transition": 3, "cue": "...",
        "parts": [
          { "name": "(Lado Izquierdo)", "duration": 20, "cue": "En cuclillas. Codo der en rodilla der. Gira y abre pecho izq al techo." },
          { "name": "(Lado Derecho)", "duration": 20, "cue": "Cambia de lado. Codo izq en rodilla izq. Gira y abre pecho der." }
        ]
      },
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
        { "id": "", "type": "exercise", "name": "Press Militar con Barra (de pie)", "sets": 4, "reps": "6-10", "rest": 90, "technique": "1. **Posición Inicial:** De pie, con los pies a la anchura de los hombros. La barra descansa sobre la parte alta del pecho (clavículas), con un agarre ligeramente más ancho que los hombros. Codos apuntando hacia abajo y ligeramente al frente. 2. **Ejecución:** Aprieta el abdomen y los glúteos para estabilizar el cuerpo. Empuja la barra verticalmente hacia arriba hasta que los brazos estén completamente extendidos sobre la cabeza. La cabeza se mueve ligeramente hacia atrás para dejar pasar la barra y vuelve a su posición neutra al final. 3. **Descenso:** Baja la barra de forma controlada a la posición inicial. No dejes que rebote en el pecho.", "progression": "Cuando completes las 4 series de 10 repeticiones con buena forma, aumenta ligeramente el peso en la siguiente sesión." },
        { "id": "", "type": "exercise", "name": "Flexiones con Chaleco Lastrado", "sets": 4, "reps": "8-15", "rest": 90, "technique": "1. **Preparación:** Colócate el chaleco lastrado. Posición de plancha alta, manos ligeramente más anchas que los hombros. Cuerpo en línea recta desde la cabeza hasta los talones. 2. **Ejecución:** Baja el pecho hacia el suelo flexionando los codos. Mantén los codos relativamente cerca del cuerpo (45-60 grados). Baja hasta que el pecho casi toque el suelo. 3. **Empuje:** Empuja con fuerza para volver a la posición inicial.", "progression": "Aumenta las repeticiones hasta llegar a 15 en todas las series. Después, considera aumentar el peso del chaleco." },
        { "id": "", "type": "exercise", "name": "Fondos en Sillas (con Chaleco Lastrado)", "sets": 3, "reps": "8-15", "rest": 75, "technique": "1. **Preparación:** Coloca dos sillas estables en paralelo. Apoya las manos en los bordes, con los nudillos hacia afuera. Extiende las piernas frente a ti (apoyando los talones para más dificultad, o los pies planos para más facilidad). 2. **Ejecución:** Baja el cuerpo flexionando los codos hasta que los hombros estén al nivel de los codos o ligeramente por debajo. Mantén el torso erguido. 3. **Empuje:** Empuja con fuerza a través de los tríceps para volver a la posición inicial.", "progression": "Aumenta las repeticiones. Cuando llegues a 15, puedes añadir peso en el regazo (si es seguro) o aumentar el peso del chaleco." },
        { "id": "", "type": "exercise", "name": "Press Francés en Suelo con Barra", "sets": 3, "reps": "8-12", "rest": 60, "technique": "1. **Posición Inicial:** Acuéstate en el suelo, rodillas flexionadas, pies planos. Sostén una barra (o barra Z) con un agarre estrecho sobre tu pecho, brazos extendidos. 2. **Ejecución:** Flexiona los codos para bajar la barra hacia tu frente o ligeramente por detrás de la cabeza. Mantén los codos apuntando al techo y los brazos superiores inmóviles. 3. **Extensión:** Extiende los codos para volver a la posición inicial, contrayendo los tríceps.", "progression": "Aumenta el peso cuando puedas completar las 3 series de 12 repeticiones." },
        { "id": "", "type": "exercise", "name": "Elevaciones Laterales (con discos)", "sets": 3, "reps": "12-20", "rest": 60, "technique": "1. **Posición Inicial:** De pie, sostén un disco de peso en cada mano a los costados, con las palmas hacia adentro. 2. **Ejecución:** Con una ligera flexión en los codos, eleva los brazos hacia los lados hasta que estén paralelos al suelo. El movimiento debe ser controlado, sin balanceos. Imagina que estás vertiendo agua de dos jarras. 3. **Descenso:** Baja los discos de forma lenta y controlada.", "progression": "Aumenta las repeticiones. Este es un ejercicio de aislamiento, enfócate en la conexión mente-músculo más que en el peso." }
      ],
      "final": { "type": "cardio", "name": "Base Aeróbica", "details": "Completar 10,000 pasos en Zona 2." }
    },
    "martes": {
      "dayName": "Martes",
      "title": "Día 2: Piernas y Núcleo 🦵",
      "warmUpType": "fuerza",
      "requiresExercise": true,
      "requiresSteps": true,
      "stepGoal": 4000,
      "steps": [
        { "id": "", "type": "exercise", "name": "Sentadilla con Barra", "sets": 4, "reps": "6-10", "rest": 120, "technique": "...", "progression": "..." },
        { "id": "", "type": "exercise", "name": "Peso Muerto Rumano con Barra", "sets": 4, "reps": "8-12", "rest": 90, "technique": "...", "progression": "..." },
        { "id": "", "type": "exercise", "name": "Zancadas (con Barra o Chaleco)", "sets": 3, "reps": "8-12 por pierna", "rest": 75, "technique": "...", "progression": "..." },
        { "id": "", "type": "exercise", "name": "Hip Thrust con Barra", "sets": 4, "reps": "10-15", "rest": 75, "technique": "...", "progression": "..." },
        { "id": "", "type": "exercise", "name": "Plancha con Chaleco Lastrado", "sets": 3, "reps": "45-75 segundos", "rest": 60, "technique": "...", "progression": "..." }
      ]
    },
    "miercoles": {
      "dayName": "Miércoles",
      "title": "Descanso Activo (Zona 1/2) 🚶‍♂️",
      "warmUpType": null,
      "requiresExercise": false,
      "requiresSteps": true,
      "stepGoal": 10000,
      "steps": [
        { "id": "", "type": "activity", "name": "Base Aeróbica", "details": "Completar 10,000 pasos en Zona 1/2.", "duration": 0 }
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
        { "id": "", "type": "exercise", "name": "Remo con Barra", "sets": 4, "reps": "6-10", "rest": 90, "technique": "...", "progression": "..." },
        { "id": "", "type": "exercise", "name": "Dominadas (con Chaleco si es posible)", "sets": 4, "reps": "al fallo", "rest": 90, "technique": "...", "progression": "..." },
        { "id": "", "type": "exercise", "name": "Remo Invertido", "sets": 3, "reps": "8-15", "rest": 75, "technique": "...", "progression": "..." },
        { "id": "", "type": "exercise", "name": "Curl de Bíceps con Barra", "sets": 3, "reps": "8-12", "rest": 60, "technique": "...", "progression": "..." },
        { "id": "", "type": "exercise", "name": "Plancha Lateral", "sets": 3, "reps": "30-45 segundos por lado", "rest": 45, "technique": "...", "progression": "..." }
      ],
      "final": { "type": "cardio", "name": "Base Aeróbica", "details": "Completar 10,000 pasos en Zona 2." }
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
          "progression": "El objetivo es aumentar la potencia y la resistencia. Intenta mantener la misma barra (o peso) durante las 4 rondas. Cuando puedas completar el complejo sin soltar la barra y con buena forma, considera aumentar ligeramente el peso."
        },
        { "id": "", "type": "cooldown", "name": "Vuelta a la Calma", "details": "5-10 minutos de estiramientos estáticos y movimiento ligero." }
      ]
    },
    "sabado": {
      "dayName": "Sábado",
      "title": "Día 4: Cuerpo Completo Funcional 💪",
      "warmUpType": "fuerza",
      "requiresExercise": true,
      "requiresSteps": true,
      "stepGoal": 4000,
      "steps": [
        { "id": "", "type": "exercise", "name": "Paseo del Granjero (Farmer's Walk)", "sets": 4, "reps": "45 segundos de caminata", "rest": 90, "technique": "...", "progression": "..." },
        { "id": "", "type": "exercise", "name": "Peso Muerto con Barra", "sets": 3, "reps": "5-8", "rest": 120, "technique": "...", "progression": "..." },
        { "id": "", "type": "exercise", "name": "Empuje Isométrico contra Tanque", "sets": 4, "reps": "15 segundos de empuje máximo", "rest": 60, "technique": "...", "progression": "..." },
        { "id": "", "type": "exercise", "name": "Burpees (con Chaleco Lastrado)", "sets": 3, "reps": "8-12", "rest": 75, "technique": "...", "progression": "..." },
        { "id": "", "type": "exercise", "name": "Giros Rusos (Russian Twists)", "sets": 3, "reps": "15-20 por lado", "rest": 60, "technique": "...", "progression": "..." }
      ]
    },
    "domingo": {
      "dayName": "Domingo",
      "title": "Descanso Activo (Zona 1/2) 🚶‍♂️",
      "warmUpType": null,
      "requiresExercise": false,
      "requiresSteps": true,
      "stepGoal": 10000,
      "steps": [
        { "id": "", "type": "activity", "name": "Base Aeróbica", "details": "Completar 10,000 pasos en Zona 1/2.", "duration": 0 }
      ]
    }
  }
}
