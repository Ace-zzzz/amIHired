# ── STAGE 1: Build ──────────────────────────────────────────
# "Give me a container that already has Maven AND Java 21 installed"
# We call this stage "builder" so we can reference it later
FROM maven:3.9-eclipse-temurin-21 AS builder

# Set the working directory inside the container.
# Think of it as: cd /app — all commands below run from here
WORKDIR /app

# Copy ONLY pom.xml first (before the source code).
# Why? Docker caches each step. If pom.xml didn't change,
# it skips the next step and reuses the cached dependencies.
# This makes rebuilds much faster.
COPY pom.xml .

# Download all dependencies declared in pom.xml.
# -B means "batch mode" (no interactive prompts)
RUN mvn dependency:go-offline -B

# NOW copy the actual source code.
# We do this AFTER downloading deps so that code changes
# don't trigger a full re-download of dependencies.
COPY src ./src

# Build the JAR. -DskipTests skips unit tests during build.
# Remove -DskipTests if you want tests to run during docker build.
RUN mvn clean package -DskipTests -B


# ── STAGE 2: Run ────────────────────────────────────────────
# Start fresh with ONLY a Java runtime (no Maven, no JDK).
# "eclipse-temurin:21-jre-alpine" = Java 21 JRE on Alpine Linux
# Alpine is a tiny Linux distro (~5MB) — keeps the image small
FROM eclipse-temurin:21-jre-alpine AS runtime

WORKDIR /app

# Security: don't run the app as "root" inside the container.
# We create a group "spring" and a user "spring", then switch to it.
# Same reason you don't browse the internet as Administrator.
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy the JAR from Stage 1 ("builder") into this lean Stage 2.
# The *.jar wildcard picks up whatever your app is named.
# Everything else from Stage 1 (Maven, JDK, source code) is discarded.
COPY --from=builder /app/target/*.jar app.jar

# Document that this container listens on port 8080.
# This doesn't actually open the port — docker-come does that.
EXPOSE 8080

# The command that runs when the container starts.
# -XX:+UseContainerSupport  → makes JVM respect Docker memory limits
# -XX:MaxRAMPercentage=75.0 → JVM uses max 75% of container RAM
# -jar app.jar              → run our Spring Boot app
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]