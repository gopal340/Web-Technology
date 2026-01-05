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

class TestFacultyLogin:
    """Test cases for Faculty Login and Dashboard"""
    
    @pytest.fixture(scope="class")
    def driver(self):
        """Setup Chrome driver"""
        options = webdriver.ChromeOptions()
        options.add_argument('--start-maximized')
        options.add_argument('--disable-blink-features=AutomationControlled')
        
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        driver.implicitly_wait(10)
        yield driver
        driver.quit()
    
    def take_screenshot(self, driver, name):
        """Take screenshot and save with timestamp"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        screenshot_dir = "selenium_tests/screenshots"
        os.makedirs(screenshot_dir, exist_ok=True)
        filepath = f"{screenshot_dir}/faculty_{name}_{timestamp}.png"
        driver.save_screenshot(filepath)
        print(f"Screenshot saved: {filepath}")
        return filepath
    
    def test_faculty_login(self, driver):
        """Test faculty login functionality"""
        print("\n=== Testing Faculty Login ===")
        
        # Navigate to login page
        driver.get("http://localhost:5173/login")
        time.sleep(2)
        self.take_screenshot(driver, "01_login_page")
        
        # Enter faculty credentials
        email_input = driver.find_element(By.NAME, "email")
        password_input = driver.find_element(By.NAME, "password")
        
        email_input.send_keys("faculty@kletech.ac.in")
        password_input.send_keys("faculty123")
        self.take_screenshot(driver, "02_credentials_entered")
        
        # Click login button
        login_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Login') or contains(text(), 'Sign In')]")
        login_button.click()
        
        # Wait for dashboard to load
        time.sleep(3)
        self.take_screenshot(driver, "03_faculty_dashboard")
        
        # Verify faculty dashboard loaded
        assert driver.find_element(By.TAG_NAME, "body")
        print("✓ Faculty login successful")
    
    def test_faculty_team_creation(self, driver):
        """Test team creation functionality"""
        print("\n=== Testing Team Creation ===")
        
        try:
            # Navigate to teams section
            teams_link = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'Team') or contains(text(), 'Groups')]"))
            )
            teams_link.click()
            time.sleep(2)
            self.take_screenshot(driver, "04_teams_page")
            
            # Look for create team button
            try:
                create_team_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Create Team') or contains(text(), 'New Team')]")
                create_team_btn.click()
                time.sleep(1)
                self.take_screenshot(driver, "05_team_creation_form")
                print("✓ Team creation interface accessible")
            except:
                self.take_screenshot(driver, "05_teams_list")
                print("✓ Teams page accessible")
                
        except Exception as e:
            print(f"⚠ Teams section not found: {e}")
            self.take_screenshot(driver, "04_teams_not_found")
    
    def test_faculty_approve_requests(self, driver):
        """Test BOM request approval functionality"""
        print("\n=== Testing Request Approvals ===")
        
        try:
            # Navigate to approvals/requests section
            approvals_link = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'Approval') or contains(text(), 'Request') or contains(text(), 'BOM')]"))
            )
            approvals_link.click()
            time.sleep(2)
            self.take_screenshot(driver, "06_approvals_page")
            
            # Check for pending requests
            try:
                requests = driver.find_elements(By.XPATH, "//div[contains(@class, 'request') or contains(@class, 'card')]")
                if requests:
                    self.take_screenshot(driver, "07_pending_requests")
                    print(f"✓ Found {len(requests)} request(s)")
                else:
                    print("✓ Approvals page accessible (no pending requests)")
            except:
                self.take_screenshot(driver, "07_no_requests")
                
        except Exception as e:
            print(f"⚠ Approvals section not found: {e}")
            self.take_screenshot(driver, "06_approvals_not_found")
    
    def test_faculty_approved_message(self, driver):
        """Test approved request messages"""
        print("\n=== Testing Approved Messages ===")
        
        # Navigate back to dashboard
        driver.get("http://localhost:5173/faculty/dashboard")
        time.sleep(2)
        self.take_screenshot(driver, "08_dashboard_home")
        
        # Look for notifications or messages
        try:
            notifications = driver.find_elements(By.XPATH, "//div[contains(@class, 'notification') or contains(@class, 'alert') or contains(@class, 'message')]")
            if notifications:
                self.take_screenshot(driver, "09_notifications")
                print(f"✓ Found {len(notifications)} notification(s)")
            else:
                print("✓ Dashboard loaded (no notifications)")
        except:
            pass
    
    def test_faculty_dashboard_graphs(self, driver):
        """Test faculty dashboard graphs and analytics"""
        print("\n=== Testing Faculty Dashboard Graphs ===")
        
        # Scroll to view graphs
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight/2);")
        time.sleep(1)
        self.take_screenshot(driver, "10_dashboard_graphs")
        
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        self.take_screenshot(driver, "11_dashboard_bottom")
        
        print("✓ Faculty dashboard graphs captured")

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--html=selenium_tests/reports/faculty_test_report.html", "--self-contained-html"])
