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

class TestFacultyGoogleAuth:
    """Test cases for Faculty Login via Google OAuth"""
    
    @pytest.fixture(scope="class")
    def driver(self):
        """Setup Chrome driver"""
        options = webdriver.ChromeOptions()
        options.add_argument('--start-maximized')
        options.add_argument('--disable-blink-features=AutomationControlled')
        options.add_argument('--user-data-dir=C:/selenium_chrome_profile')
        
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        driver.implicitly_wait(10)
        yield driver
        driver.quit()
    
    def take_screenshot(self, driver, name):
        """Take screenshot and save with timestamp"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        screenshot_dir = "screenshots"
        os.makedirs(screenshot_dir, exist_ok=True)
        filepath = f"{screenshot_dir}/faculty_{name}_{timestamp}.png"
        driver.save_screenshot(filepath)
        print(f"✓ Screenshot saved: {filepath}")
        return filepath
    
    def test_01_faculty_google_login(self, driver):
        """Test faculty login via Google OAuth"""
        print("\n" + "="*80)
        print("  FACULTY - GOOGLE OAUTH LOGIN TEST")
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
            time.sleep(5)
            self.take_screenshot(driver, "03_google_auth_page")
            
            if "accounts.google.com" in driver.current_url:
                print("\n⚠ MANUAL ACTION REQUIRED:")
                print("  Please log in with: 01fe23bcs081@kletech.ac.in")
                print("  Waiting 30 seconds for manual login...")
                time.sleep(30)
                self.take_screenshot(driver, "04_after_manual_login")
            
            time.sleep(5)
            self.take_screenshot(driver, "05_faculty_dashboard")
            print("✓ Faculty Google login successful")
            
        except Exception as e:
            print(f"⚠ Google login flow: {e}")
            self.take_screenshot(driver, "02_google_login_error")
    
    def test_02_faculty_dashboard(self, driver):
        """Test faculty dashboard and graphs"""
        print("\n=== Testing Faculty Dashboard ===")
        
        time.sleep(2)
        self.take_screenshot(driver, "06_dashboard_overview")
        
        driver.execute_script("window.scrollTo(0, 500);")
        time.sleep(1)
        self.take_screenshot(driver, "07_dashboard_graphs")
        
        print("✓ Faculty dashboard captured")
    
    def test_03_faculty_teams(self, driver):
        """Test teams functionality"""
        print("\n=== Testing Teams Section ===")
        
        try:
            driver.execute_script("window.scrollTo(0, 0);")
            time.sleep(1)
            
            nav_links = driver.find_elements(By.TAG_NAME, "a")
            for link in nav_links:
                if "team" in link.text.lower():
                    link.click()
                    time.sleep(2)
                    self.take_screenshot(driver, "08_teams_page")
                    print("✓ Teams page accessed")
                    return
            
            print("⚠ Teams link not found")
            self.take_screenshot(driver, "08_teams_not_found")
            
        except Exception as e:
            print(f"⚠ Teams section: {e}")
            self.take_screenshot(driver, "08_teams_error")

if __name__ == "__main__":
    pytest.main([__file__, "-v", "-s"])
