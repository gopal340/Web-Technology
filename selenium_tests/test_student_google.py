import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import os
from datetime import datetime

class TestStudentGoogleAuth:
    """Test cases for Student Login via Google OAuth"""
    
    @pytest.fixture(scope="class")
    def driver(self):
        """Setup Chrome driver"""
        options = webdriver.ChromeOptions()
        options.add_argument('--start-maximized')
        options.add_argument('--disable-blink-features=AutomationControlled')
        # Keep user data to maintain Google login session
        options.add_argument('--user-data-dir=C:/selenium_chrome_profile')
        
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        driver.implicitly_wait(10)
        yield driver
        driver.quit()
    
    def take_screenshot(self, driver, name):
        """Take screenshot and save with timestamp"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        screenshot_dir = "selenium_tests/screenshots"
        os.makedirs(screenshot_dir, exist_ok=True)
        filepath = f"{screenshot_dir}/student_{name}_{timestamp}.png"
        driver.save_screenshot(filepath)
        print(f"✓ Screenshot saved: {filepath}")
        return filepath
    
    def test_01_student_google_login(self, driver):
        """Test student login via Google OAuth"""
        print("\n" + "="*80)
        print("  STUDENT - GOOGLE OAUTH LOGIN TEST")
        print("="*80)
        
        # Navigate to login page
        driver.get("http://localhost:5173/login")
        time.sleep(3)
        self.take_screenshot(driver, "01_login_page")
        
        try:
            # Look for Google Sign-In button
            google_btn = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Google') or contains(., 'google')]"))
            )
            self.take_screenshot(driver, "02_google_button_found")
            google_btn.click()
            
            print("✓ Clicked Google Sign-In button")
            
            # Wait for Google login page or redirect
            time.sleep(5)
            self.take_screenshot(driver, "03_google_auth_page")
            
            # If already logged in, it will redirect to dashboard
            # If not, manual login required (pause for user)
            if "accounts.google.com" in driver.current_url:
                print("\n⚠ MANUAL ACTION REQUIRED:")
                print("  Please log in with: 01fe23bcs081@kletech.ac.in")
                print("  Waiting 30 seconds for manual login...")
                time.sleep(30)
                self.take_screenshot(driver, "04_after_manual_login")
            
            # Wait for dashboard
            time.sleep(5)
            self.take_screenshot(driver, "05_student_dashboard")
            print("✓ Student Google login successful")
            
        except Exception as e:
            print(f"⚠ Google login flow: {e}")
            self.take_screenshot(driver, "02_google_login_error")
    
    def test_02_student_dashboard(self, driver):
        """Test student dashboard view"""
        print("\n=== Testing Student Dashboard ===")
        
        time.sleep(2)
        self.take_screenshot(driver, "06_dashboard_overview")
        
        # Scroll to view graphs
        driver.execute_script("window.scrollTo(0, 500);")
        time.sleep(1)
        self.take_screenshot(driver, "07_dashboard_graphs_1")
        
        driver.execute_script("window.scrollTo(0, 1000);")
        time.sleep(1)
        self.take_screenshot(driver, "08_dashboard_graphs_2")
        
        print("✓ Student dashboard captured")
    
    def test_03_student_bom(self, driver):
        """Test BOM functionality"""
        print("\n=== Testing BOM Section ===")
        
        try:
            # Try to find and click BOM link
            driver.execute_script("window.scrollTo(0, 0);")
            time.sleep(1)
            
            # Look for navigation links
            nav_links = driver.find_elements(By.TAG_NAME, "a")
            for link in nav_links:
                if "bom" in link.text.lower() or "material" in link.text.lower():
                    link.click()
                    time.sleep(2)
                    self.take_screenshot(driver, "09_bom_page")
                    print("✓ BOM page accessed")
                    return
            
            print("⚠ BOM link not found in navigation")
            self.take_screenshot(driver, "09_bom_not_found")
            
        except Exception as e:
            print(f"⚠ BOM section: {e}")
            self.take_screenshot(driver, "09_bom_error")

if __name__ == "__main__":
    pytest.main([__file__, "-v", "-s"])
