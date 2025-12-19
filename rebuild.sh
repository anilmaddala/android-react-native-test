#!/bin/bash
set -e

# Color output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 React Native Command Bridge - Rebuild Script${NC}"
echo ""

# 1. Bundle JavaScript
echo -e "${YELLOW}📦 Step 1/4: Bundling JavaScript...${NC}"
cd skydio-rn-business-logic
npx react-native bundle \
  --entry-file index.js \
  --platform android \
  --dev false \
  --bundle-output ../skydio-android-app/app/src/main/assets/index.android.bundle \
  --assets-dest ../skydio-android-app/app/src/main/res/

# Verify bundle was created
BUNDLE_SIZE=$(stat -f%z ../skydio-android-app/app/src/main/assets/index.android.bundle 2>/dev/null || stat -c%s ../skydio-android-app/app/src/main/assets/index.android.bundle 2>/dev/null)
echo -e "${GREEN}✓ Bundle created (${BUNDLE_SIZE} bytes)${NC}"
echo ""

# 2. Build APK
echo -e "${YELLOW}🔨 Step 2/4: Building APK...${NC}"
cd ../skydio-android-app
./gradlew assembleDebug
echo -e "${GREEN}✓ APK built successfully${NC}"
echo ""

# 3. Install on device
echo -e "${YELLOW}📱 Step 3/4: Installing on device...${NC}"
adb install -r app/build/outputs/apk/debug/app-debug.apk
echo -e "${GREEN}✓ Installed on device${NC}"
echo ""

# 4. Launch app
echo -e "${YELLOW}🚀 Step 4/4: Launching app...${NC}"
adb shell am start -n com.example.skydioandroidapp/.MainActivity
echo -e "${GREEN}✓ App launched${NC}"
echo ""

echo -e "${GREEN}✅ All done! Monitor logs with:${NC}"
echo -e "${BLUE}   adb logcat | grep -E \"(CommandBridge|Handlers|Store)\"${NC}"
